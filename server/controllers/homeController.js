/* eslint-disable strict */
/* eslint-disable max-len */

'use strict';
const logger = require('../config/logger.js');
const db = require('../db.js');
const request = require('request');
const hardware = require('../../config.js');
const redis = require('redis');
const client = redis.createClient(); // defaults to 127.0.0.1:6379
const crontab = require('node-crontab');

client.on('error', (err) => {
  console.log(`Error ${err}`);
});

// Gets list of devices when dashboard first loads
exports.getDevices = (req, res) => {
  const homeId = req.params.homeId;
  console.log('home id is ', homeId);
  logger.info('HomeId in getDevices: ', homeId);

  db.query('SELECT ${column^} FROM ${table~} where houseId=${home}', {
    column: '*',
    table: 'devices',
    home: homeId,
  })
  .then((result) => {
    logger.info('SUCCESS in getDevices: ', result);
    return res.json(result);
  })
  .catch((error) => {
    logger.info('ERROR in get devices: ', error);
    return res.send(error);
  });
};


// Adds the device to the database after host fills out set options form
exports.addDevice = (req, res) => {
  const newDevice = {
    houseId: req.params.homeId,
    name: req.body.name,
    description: req.body.description,
    isactive: req.body.isactive,
    hardwarekey: req.params.deviceId,
    usagecostoptions: req.body.cost,
  };

  db.one('INSERT INTO devices(houseId, name, description, isactive, hardwarekey, usagecostoptions) VALUES(${houseId}, ${name}, ${description}, ${isactive}, ${hardwarekey}, ${usagecostoptions}) RETURNING *', newDevice)
  .then((result) => {
    logger.info(result);
    return res.json(result);
  })
  .catch((error) => {
    logger.info(error);
    return res.send(error);
  });
};

// Sends ping to device after host first types the code
exports.pingDevice = (req, res) => {
  const deviceId = req.params.deviceId;

  const options = { method: 'POST',
    url: `https://api-http.littlebitscloud.cc/devices/${deviceId}/output`,
    headers: {
      authorization: `Bearer ${hardware.ACCESS_TOKEN}`,
      'content-type': 'application/json',
      accept: 'application/vnd.littlebits.v2+json',
    },
    body: { duration_ms: 100 },
    json: true };

  request(options, (error, response, body) => {
    if (error) {
      throw new Error('error!!! ', error);
    } else {
      return res.json(body);
    }
  });
};

// Toggles device for both guests and hosts
exports.toggleDevice = (req, res) => {
  console.log('req.body is ', req.body);
  const deviceId = req.params.deviceId;
  const updateDevice = {
    hardwarekey: req.params.deviceId,
    isactive: req.body.isactive,
    paidusage: req.body.paidusage,
  };

  const options = { method: 'POST',
    url: `https://api-http.littlebitscloud.cc/devices/${deviceId}/output`,
    headers: {
      authorization: `Bearer ${hardware.ACCESS_TOKEN}`,
      'content-type': 'application/json',
      accept: 'application/vnd.littlebits.v2+json',
    },
    body: { duration_ms: 100 },
    json: true };

  request(options, (error, response, body) => {
    if (error) {
      throw new Error('error!!! ', error);
    } else {
      // update database ---- db.query(update device w isactive and paidusage booleans)
      db.many('UPDATE devices SET isactive=${isactive}, paidusage=${paidusage} WHERE hardwarekey=${hardwarekey} RETURNING *', updateDevice) // .many for demo purposes - multiple devices with same id
        .then((result) => {
          logger.info(result);
          // Add to expiry queue if guest request - adds deviceId as value, endingTime as the score - time complexity is O(log(N))
          if (req.body.paidusage === 'true') {
            const d = new Date();
            const now = d.getTime();
            const endingTime = now + parseInt(req.body.time, 10);

            client.zadd('device', endingTime, deviceId, redis.print);
            return res.json(body);
          }
          return res.json(body);
        })
        .catch((err) => {
          logger.info(err);
          return res.send(err);
        });
    }
  });
};

// This will call this function every 1 minutes
crontab.scheduleJob('*/1 * * * *', () => {
  const d = new Date();
  const now = d.getTime();
  client.multi()
    .zrangebyscore('device', '-inf', now, redis.print)
    .exec((err, results) => {
      // toggle off all of the devices that have expired times
      for (let i = 0; i < results[0].length; i++) {
        const device = results[0][i];
        const options = { method: 'POST',
          url: `https://api-http.littlebitscloud.cc/devices/${device}/output`,
          headers: {
            authorization: `Bearer ${hardware.ACCESS_TOKEN}`,
            'content-type': 'application/json',
            accept: 'application/vnd.littlebits.v2+json',
          },
          body: { duration_ms: 100 },
          json: true };

        request(options, (error) => {
          if (error) {
            throw new Error('error!!! ', error);
          } else {
            // delete device from redis
            client.zrem('device', results[0][i]);
            // update persistent database
            const deviceOff = {
              isactive: false,
              paidusage: false,
              hardwarekey: results[0][i],
            };
            db.many('UPDATE devices SET isactive=${isactive}, paidusage=${paidusage} WHERE hardwarekey=${hardwarekey} RETURNING *', deviceOff) // .many for demo purposes - multiple devices with same id
              .then((result) => {
                logger.info(result);
              })
              .catch((updateError) => {
                logger.info(updateError);
              });
          }
        });
      }
    });
});


