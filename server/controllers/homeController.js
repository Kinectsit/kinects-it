const logger = require('../config/logger.js');
const db = require('../db.js');

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

exports.addDevice = (req, res) => {
  const homeId = req.params.homeId;
  const deviceId = req.params.deviceId;
  const deviceAccessToken = req.params.deviceAccessToken;
  logger.info('homeId in addDevice: ', homeId);
  logger.info('deviceId in addDevice: ', deviceId);
  logger.info('deviceAccessToken in addDevice: ', deviceAccessToken);

  // perform API call to LilBits to enable Device
  return res.json({ success: true, deviceKey: '12345' });
  // Error testing:
  // return res.error({ failed: true });
};



