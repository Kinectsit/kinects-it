/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const homeRouter = require('express').Router();
const homeController = require('../controllers/homeController.js');

/*
 Declare all routes for homes and specify what controller method we're going to use for each
 The path '/api/v1/homes' is already prepended to all routes based on app.use statement in server.js
*/
homeRouter.route('/:homeId/devices').get(homeController.getDevices);
homeRouter.route('/:homeId/devices/:deviceId').post(homeController.toggleDevice);
homeRouter.route('/:homeId/devices/:deviceId').get(homeController.getDeviceInfo);
homeRouter.route('/:homeId/devices/ping/:deviceId').post(homeController.pingDevice);
homeRouter.route('/:homeId/devices').post(homeController.addDevice);

module.exports = homeRouter;
