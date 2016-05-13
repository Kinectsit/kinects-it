/* eslint max-len: ["error", 200] */
const bcrypt = require('bcrypt-nodejs');
const User = {};
// const logger = require('../config/logger.js');
const db = require('../db.js');
const utils = require('../utils/helpers.js');
// const Promise = require('bluebird');

User.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

User.comparePasswords = (providedPassword, userPassword) => {
  const comp = bcrypt.compareSync(providedPassword, userPassword);
  return comp;
};

User.create = (newUser) => {
  console.log('inside create for user: ', newUser);

  db.tx(t => ( // automatic BEGIN
    t.one('INSERT INTO users(name, email, password, defaultViewHost) VALUES(${name}, ${email}, ${password}, ${host}) RETURNING id', newUser)
      .then(userData => {
        console.log('In inner then of transaction, data = ', userData);

        const hostCode = utils.randomString(6);
        console.log('hostcode = ', hostCode);

        return t.one('INSERT INTO houses(invitecode) VALUES($1) RETURNING id', hostCode)
          .then((houseData) => {
            console.log('successful house creation: ', houseData);

            return t.one('INSERT INTO users_houses(userid, houseid) VALUES($1, $2) RETURNING userid, houseid', [userData.id, houseData.id])
            .then((userHouseData) => {
              console.log('successful insert into userHouseData: ', userHouseData);
              throw new Error();
            })
            .catch((error) => {
              console.log('error inside userHouseData: ', error);
              throw new Error();
            }); 
          })
          .catch((error) => {
            console.log('inside error: ', error);
            throw new Error();
          });
      })
  ))
  .then((data) => {
    console.log('inside outer then of transaction, data = ', data);
    // res.send('Everything\'s fine!'); // automatic COMMIT was executed
  })
  .catch(error => {
    console.log('inside outer error of transaction, data = ', error);
    // res.send('Something is wrong!'); // automatic ROLLBACK was executed
  });
};


module.exports = User;
