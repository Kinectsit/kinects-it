const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./config/logger.js');
// const passport = require('passport');
// const session = require('express-session');
// const apiKeys = require('../config.js');
// const CoinbaseStrategy = require('passport-coinbase').Strategy;
/*
  Set up routers for the different APIs
*/
const userRouter = require('./routers/userRouter.js');
const homeRouter = require('./routers/homeRouter.js');

// configuration variables
const port = process.env.PORT || 3000;
const srcPath = process.env.NODE_ENV === 'development' ? '/../src/' : '/../dist';


app.use(require('morgan')('combined', { stream: logger.stream }));

// Allow cross origin requests (need for requests from client because on different port)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Use the CoinbaseStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken and refreshToken),
//   and invoke a callback with a user object.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session({ secret: 'kinectsit2016team3feb' }));

// Serve static files
app.use(express.static(path.join(__dirname, srcPath)));

// Authentication Middleware
// app.use(passport.initialize());

// passport.use('coinbase', new CoinbaseStrategy({
//   clientID: apiKeys.COINBASE_CLIENT_ID,
//   clientSecret: apiKeys.COINBASE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/api/v1/users/callback',
//   scope: ['user'],
// },
//   (accessToken, refreshToken, profile, done) => {
//     // asynchronous verification, for effect...
//     process.nextTick(() =>
//       // To keep the example simple, the user's Coinbase profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Coinbase account with a user record in your database,
//       // and return that user instead.
//       done(null, profile)
//     );
//   }
// ));

/*
   Middleware to configure routes for each api
*/
app.use('/api/v1/users', userRouter);
app.use('/api/v1/homes', homeRouter);

// send all other requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, srcPath, '/index.html'));
});

app.listen(port, () => logger.info('Kinectsit API server listening on port: ', port));

module.exports = app;
