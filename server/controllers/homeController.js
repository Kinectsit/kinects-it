/* eslint-disable strict */
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


exports.toggleDevice = (req, res) => {
  const deviceId = req.params.deviceId;
  const isActive = req.body.isActive;
  const paidUsage = req.body.paidUsage;
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
      if (paidUsage === 'true') {
        // Adds deviceId as value, endingTime as the score - time complexity is O(log(N))
        client.zadd('device', endingTime, deviceId, redis.print);
        // update database ---- db.query(update device w isActive and paidUsage booleans)
        console.log(`database should include ${isActive} ${paidUsage}`);
      }
      return res.json(body);
    }
  });
};

exports.addDevice = (req, res) => {
  console.log('req.body is ', req.body);
  // add to database
  res.send('will add to db once query is written');
};

