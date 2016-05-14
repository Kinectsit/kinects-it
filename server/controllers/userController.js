/* eslint max-len: ["error", 150] */
// const User = require('../models/userModel.js');
const logger = require('../config/logger.js');
// const passport = require('passport');
const db = require('../db.js');

module.exports.signUp = (req, res, next) => {
  // console.log('passport: ', passport.authenticate('coinbase'));
  // passport.authenticate('coinbase');
  // console.log('call to signup made with this data:', req.body);
  db.one('INSERT INTO users(name, email, password, defaultViewHost) VALUES(${name}, ${email}, ${password}, ${host}) RETURNING *', req.body)
  .then((result) => {
        // success;
    // console.log('the search was successful! Results:', result);
    logger.info(result);
    res.send(result);
  })
  .catch((error) => {
     // error;
    // console.log('there was an error in the search:', error);
    logger.info(error);
    res.send(error);
  })
  .finally(() => {
    next();
  });
};

module.exports.addToHome = (req, res, next) => {

  /*
   transaction will need to do the following:
     1. Retrive the house id based on the invite code
     2. Insert a record into users_houses with the house id from #1 and the user id passed in on the API

  */
  const userId = req.params.id;
  const inviteCode = req.params.code;

  console.log('userId: ', userId);
  console.log('invite code: ', inviteCode);

  db.query('SELECT ${column^} FROM ${table~} where invitecode=${code}', {
    column: 'id',
    table: 'houses',
    code: inviteCode,
  })
  .then((houseId) => {
    logger.info('SUCCESS in addToHome retrival of house id: ', houseId);

    return db.one('INSERT INTO users_houses (userid, houseid, ishosthouse) values($1, $2, $3) RETURNING *', [userId, houseId, false]);
  })
  .then((data) => {
    console.log('Success insert for addToHome: ', data);
    return res.json({ woot: 'woot' });
  })
  .catch((error) => {
    logger.info('ERROR in addToHome: ', error);
    return res.send(error);
  });
};

