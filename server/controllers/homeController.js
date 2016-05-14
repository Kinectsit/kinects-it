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
            // need to send query to database to change toggle active to off
            // also need to toggle paidUsage to false
          }
        });
      }
    });
});


exports.getDevices = (req, res, next) => {
  const homeId = req.params.id;
  logger.info('HomeId in getDevices: ', homeId);

  db.query('SELECT ${column^} FROM ${table~} where houseId=${home}', {
    column: '*',
    table: 'devices',
    home: homeId,
  })
  .then((result) => {
    logger.info('SUCCESS in getDevices: ', result);
    res.send(result);
  })
  .catch((error) => {
    logger.info('ERROR in getDevices: ', error);
    res.send(error);
  })
  .finally(() => {
    next();
  });
};

// Toggles device for both guests and hosts
exports.toggleDevice = (req, res) => {
  const deviceId = req.params.deviceId;
  const updateDevice = {
    hardwareKey: req.params.deviceId,
    isActive: req.body.isActive,
    paidUsage: req.body.paidUsage,
  };
  const d = new Date();
  const now = d.getTime();
  const endingTime = now + parseInt(req.body.time, 10);

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
      // update database ---- db.query(update device w isActive and paidUsage booleans)
      db.many('UPDATE devices SET isActive=${isActive}, paidUsage=${paidUsage} WHERE hardwareKey=${hardwareKey} RETURNING *', updateDevice)
        .then((result) => {
          logger.info(result);
          // Add to expiry queue if guest request - adds deviceId as value, endingTime as the score - time complexity is O(log(N))
          if (req.body.paidUsage === 'true') {
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

// Adds the device to the database after host fills out set options form
exports.addDevice = (req, res) => {
  const newDevice = {
    houseId: req.params.homeId,
    name: req.body.name,
    description: req.body.description,
    isActive: req.body.isActive,
    hardwareKey: req.params.deviceId,
    usageCostOptions: req.body.cost,
  };

  db.one('INSERT INTO devices(houseId, name, description, isActive, hardwareKey, usageCostOptions) VALUES(${houseId}, ${name}, ${description}, ${isActive}, ${hardwareKey}, ${usageCostOptions}) RETURNING *', newDevice)
  .then((result) => {
    logger.info(result);
    return res.send(result);
  })
  .catch((error) => {
    logger.info(error);
    return res.send(error);
  });
};
