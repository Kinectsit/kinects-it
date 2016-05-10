const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./config/logger.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
// const userRouter = require('./routers/userRouter');
const homeRouter = require('./routers/homeRouter.js');
const apiRouter = require('./routers/routes');

// configuration ===============================================================
require('./config/passport')(passport); // pass passport for configuration

// configuration variables
const port = process.env.PORT || 3000;
const srcPath = process.env.NODE_ENV === 'development' ? '/../src/' : '/../dist';

app.use(express.static(path.join(__dirname, srcPath)));
// eslint-disable-next-line global-require
app.use(require('morgan')('combined', { stream: logger.stream }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
  secret: 'kinectsit2016team3feb',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.session());
app.use(flash());

// routes ======================================================================
// load our routes and pass in our app and fully configured passport

app.use('/api/v1/homes', homeRouter);
// app.use('/api/v1/users', userRouter);
apiRouter(app, passport);
// app.use('/api/v1/users', userRouter);

// send all other requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, srcPath, '/index.html'));
});

app.listen(port, () => logger.info('Kinectsit API server listening on port: ', port));

module.exports = app;
