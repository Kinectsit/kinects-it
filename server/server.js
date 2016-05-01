const express = require('express');
const app = module.exports = express();

const bodyParser = require('body-parser');
const logger = require('./config/logger.js');

/*
  Set up routers for the different APIs
  Example: var userRouter = require(./routers/userRouter.js)
*/

// configuration variables for server port and mongodb URI
const port = process.env.PORT || 3000;

app.use(require('morgan')('combined', { stream: logger.stream }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname.concat('/../src')));

/*
   Middleware to configure routes for each api
   Example: app.use('/api/users', userRouter);
*/

app.listen(port, () => logger.info('Kinectsit API server listening on port: ', port));
