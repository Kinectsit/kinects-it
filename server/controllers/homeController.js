/* eslint-disable strict */
/* eslint-disable max-len, consistent-return, no-else-return */

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
exports.addDevice = (req, res, next) => {
  const newDevice = {
    houseId: req.params.homeId,
    name: req.body.name,
    description: req.body.description,
    isactive: req.body.isactive,
    deviceId: req.body.id,
    usagecostoptions: req.body.cost,
  };

  db.one('INSERT INTO devices(id, houseId, name, description, isactive, hardwarekey, usagecostoptions) VALUES(${deviceId}, ${houseId}, ${name}, ${description}, ${isactive}, ${deviceId}, ${usagecostoptions}) RETURNING *', newDevice)
  .then((result) => {
    logger.info(result);
    return res.json(result);
  })
  .catch((error) => {
    logger.info(error);
    return res.send(error);
  })
  .finally(() => {
    next();
  });
};

// Sends ping to device after host first types the code
exports.pingDevice = (req, res) => {
  const deviceId = req.params.deviceId;

  db.none('SELECT ${column^} FROM ${table~} where id=${device}', {
    column: '*',
    table: 'devices',
    device: deviceId,
  })
  .then(() => {
    // if none exist, test if it responds
    const options = { method: 'POST',
    url: `https://api-http.littlebitscloud.cc/devices/${deviceId}/output`,
    headers: {
      authorization: `Bearer ${hardware.ACCESS_TOKEN}`,
      'content-type': 'application/json',
      accept: 'application/vnd.littlebits.v2+json',
    },
    body: { duration_ms: 4000 },
    json: true };

    request(options, (error, response, body) => {
      if (error) {
        throw new Error('error!!! ', error);
      } else {
        return res.json(body);
      }
    });
  })
  .catch((err) => {
    // One already exists, return an error
    logger.error('Device already exists, return error: ', err);

    const error = { setup: false,
                    message: 'Setup failed. Device already exists' };

    return res.send(error);
  });
};

// Toggles device for both guests and hosts
exports.toggleDevice = (req, res) => {
  const deviceId = req.params.deviceId;

  const updateDevice = {
    deviceId: req.params.deviceId,
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
      return res.json({
        success: false,
        message: 'Failed to communicate to device, please try again',
      });
    } else {
      // Update database with the current status of the device
      db.many('UPDATE devices SET isactive=${isactive}, paidusage=${paidusage} WHERE id=${deviceId} RETURNING *', updateDevice) // .many for demo purposes - multiple devices with same id
        .then(() => {
          // If the guest purchased the time...
          if (req.body.paidusage === 'true') {
            const d = new Date();
            const now = d.getTime();
            const endingTime = now + parseInt(req.body.timespent, 10);
            // Add to expiry queue if guest request - adds deviceId as value, endingTime as the score - time complexity is O(log(N))
            client.multi()
              .zadd('device', endingTime, deviceId, redis.print)
              .exec(() => {
                const deviceTransaction = {
                  useraccountid: parseInt(req.body.payaccountid, 10),
                  deviceid: req.body.deviceid,
                  amountspent: parseFloat(req.body.amountspent, 10),
                  timespent: parseInt(req.body.timespent, 10),
                };
                // Add to the device transaction database
                db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction)
                  .then(() => {
                    res.end(body);
                  })
                  .catch((er) => {
                    logger.info(er);
                  });
              });
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
    .zrangebyscore('device', '-inf', now)
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
            db.many('UPDATE devices SET isactive=${isactive}, paidusage=${paidusage} WHERE id=${hardwarekey} RETURNING *', deviceOff) // .many for demo purposes - multiple devices with same id
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
