/* eslint max-len: ["error", 200] */
const bcrypt = require('bcrypt-nodejs');
const User = {};
const logger = require('../config/logger.js');
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
  return db.tx(t => (
    t.one('INSERT INTO users(name, email, password, defaultviewhost) VALUES(${name}, ${email}, ${password}, ${host}) RETURNING id, name, email, defaultviewhost', newUser)
      .then(userData => {
        if (!userData.defaultviewhost) {
          return {
            name: userData.name,
            email: userData.email,
            id: userData.id,
            defaultViewHost: userData.defaultviewhost,
          };
        }

        const hostCode = utils.randomString(6);

        return t.one('INSERT INTO houses(invitecode) VALUES($1) RETURNING id, invitecode', hostCode)
          .then((houseData) => {
            return t.one('INSERT INTO users_houses(userid, houseid) VALUES($1, $2) RETURNING userid, houseid', [userData.id, houseData.id])
            .then((/* userHouseData */) => {
              // sucess in inner most query, now what?
              return {
                name: userData.name,
                email: userData.email,
                id: userData.id,
                defaultViewHost: userData.defaultviewhost,
                home: {
                  hostCode: houseData.invitecode,
                  id: houseData.id,
                },
              };
            });
          });
      })
  ));
};


module.exports = User;
