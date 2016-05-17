/* eslint max-len: ["error", 250] */
/* eslint-disable arrow-body-style */
const bcrypt = require('bcrypt-nodejs');
const User = {};
const db = require('../db.js');
const utils = require('../utils/helpers.js');
const logger = require('../config/logger.js');

User.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

User.comparePasswords = (providedPassword, userPassword) => {
  const comp = bcrypt.compareSync(providedPassword, userPassword);
  return comp;
};

User.create = (newUser) => {
  return db.tx(t => (
    t.one('INSERT INTO users(name, email, password, defaultviewhost,avatarurl) VALUES(${name}, ${email}, ${password}, ${host}, ${avatarURL}) RETURNING id, name, email, defaultviewhost, avatarurl', newUser)
      .then(userData => {
        const pay = {
          userid: userData.id,
        };
        // if there is a coinbase id associated with new user
        // add the payment method
        if (newUser.coinbaseId.length) {
          pay.nickname = 'My Coinbase';
          pay.paymethodid = 2;
        } else {
          pay.nickname = 'My Demo Pay Method';
          pay.paymethodid = 1;
        }
        return t.one('INSERT INTO user_pay_accounts(nickname, userid, paymethodid) VALUES(${nickname}, ${userid}, ${paymethodid}) RETURNING id, nickname, paymethodid', pay)
        .then((payAccount) => {
          // need to handle if this is coming from coinbase then
          // skip until we can update the user with the host information
          if (!userData.defaultviewhost) {
            return {
              name: userData.name,
              email: userData.email,
              id: userData.id,
              defaultViewHost: userData.defaultviewhost,
              payAccounts: [{
                id: payAccount.id,
                nickname: payAccount.nickname,
              }],
            };
          }
          const hostCode = utils.randomString(6);

          return t.one('INSERT INTO houses(invitecode, housename) VALUES($1, $2) RETURNING id, invitecode, housename', [hostCode, newUser.home])
            .then((houseData) => {
              return t.one('INSERT INTO users_houses(userid, houseid, ishosthouse) VALUES($1, $2, $3) RETURNING userid, houseid, ishosthouse', [userData.id, houseData.id, true])
              .then(() => {
                return {
                  name: userData.name,
                  email: userData.email,
                  id: userData.id,
                  defaultViewHost: userData.defaultviewhost,
                  house: {
                    id: houseData.id,
                    hostCode: houseData.invitecode,
                    name: houseData.housename,
                  },
                  payAccounts: [{
                    id: payAccount.id,
                    nickname: payAccount.nickname,
                  }],
                };
              });
            });
        });
      })
  ));
};

User.update = (updateUser) => {
  console.log('user found. updating user now');
  return db.one('UPDATE users SET name=${name}, email=${email}, password=${password}, defaultviewhost=${host}, avatarurl=${avatarURL} WHERE email = ${email} RETURNING id, name, email, defaultviewhost, avatarURL', updateUser)
  .then(updatedUser => {
    console.log('we updated the user and here is the result', updatedUser);
    return updatedUser;
  })
  .catch(err => {
    logger.info(err);
    return err;
  });
};

module.exports = User;
