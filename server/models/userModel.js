/* eslint max-len: ["error", 250] */
/* eslint-disable arrow-body-style, strict */
'use strict';

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
  // before update, just confirm we can find the user in the db
  // console.log('Updating the user with this information:', updateUser);
  let newUserObject = updateUser;
  let returnObject = {};
  return db.tx(t => (
    t.any('SELECT * from users where email=$1 OR name=$2', [updateUser.email, updateUser.name])
        .then((result) => {
          if (!result.length) {
           // if nothing is found then throw error that it doesn't exist
            return { Error: 'That user does not exist in the database. Update failed.' };
          }
          // if user is found in the database
          // we want to combine the result with the updateUser object passed in to the model
          // this merges updateUser into result, overwriting any common properties
          console.log('combining the found item:', result);
          console.log('with the update user object:', updateUser);
          newUserObject = Object.assign(result[0], updateUser);
          console.log('newUserObject has been updated:', newUserObject);
          return newUserObject;
        })
        .then(user =>
          t.one('UPDATE users SET name=${name}, email=${email}, password=${password}, defaultviewhost=${host}, avatarurl=${avatarurl} WHERE email = ${email} RETURNING id, name, email, defaultviewhost, avatarURL', user)
        ).then(updatedUser => {
          // updated user now need to check if has home to update
          console.log('this is the newUserObject after update:', updatedUser);
          if (newUserObject.home) {
            // if adding a home, create house code and add to db
            const hostCode = utils.randomString(6);
            return t.one('INSERT INTO houses(invitecode, housename) VALUES($1, $2) RETURNING id, invitecode, housename', [hostCode, newUserObject.home])
              // home added to home table, now need to adde to users_houses
              .then((houseData) => {
                console.log('house successfully added to the db:', houseData);
                returnObject.house = {
                  id: houseData.id,
                  code: houseData.invitecode,
                  name: houseData.housename,
                };
                return t.one('INSERT INTO users_houses(userid, houseid, ishosthouse) VALUES($1, $2, $3) RETURNING userid, houseid, ishosthouse', [newUserObject.id, houseData.id, true]);
              })
              .then(houseData => {
                console.log('this is the updatedUser:', updatedUser);
                console.log('this is the house information', houseData);
                returnObject.user = updatedUser;
                return returnObject;
              });
          }
          // user is just a guest so just return updatedUser
          console.log('no home to add/update so this is the updatedUser:', updatedUser);
          return { user: updatedUser };
        })
        .catch(err => {
          logger.info(err);
          return err;
        })
  ));
};

module.exports = User;
