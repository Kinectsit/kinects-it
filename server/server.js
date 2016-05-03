const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./config/logger.js');

// configuration variables for server port and mongodb URI
const port = process.env.PORT || 3000;

/*
  Set up routers for the different APIs
*/
const userRouter = require('./routers/userRouter.js');

app.use(require('morgan')('combined', { stream: logger.stream }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname.concat('/../src')));

/*
   Middleware to configure routes for each api
*/
app.use('/api/users', userRouter);

// send all other requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../src/index.html'));
});

app.listen(port, () => logger.info('Kinectsit API server listening on port: ', port));

module.exports = app;
