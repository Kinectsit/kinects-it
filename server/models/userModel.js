/* eslint max-len: ["error", 200] */
const bcrypt = require('bcrypt-nodejs');
const User = {};
// const logger = require('../config/logger.js');
const db = require('../db.js');
// const Promise = require('bluebird');

User.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

User.comparePasswords = (providedPassword, userPassword) => {
  const comp = bcrypt.compareSync(providedPassword, userPassword);
  return comp;
};

User.create = (newUser) => {
// return db.one('INSERT INTO users(name, email, password, defaultViewHost)
// VALUES(${name}, ${email}, ${password}, ${host}) RETURNING *', newUser)

  console.log('inside create for user: ', newUser);

  //  db.tx( t => { // automatic BEGIN
  //     return t.one('INSERT_1 VALUES(...) RETURNING id', paramValues)
  //         .then(data=> {
  //             var q = t.none('INSERT_2 VALUES(...)', data.id);
  //             if (req.body.value != null) {
  //                 return q.then(()=> t.none('INSERT_3 VALUES(...)', data.id));
  //             }
  //             return q;
  //         });
  // })
  // .then((data)=> {
  //     res.send("Everything's fine!"); // automatic COMMIT was executed
  // })
  // .catch(error=> {
  //     res.send("Something is wrong!"); // automatic ROLLBACK was executed
  // });

  db.tx(t => ( // automatic BEGIN
    t.one('INSERT INTO users(name, email, password, defaultViewHost) VALUES(${name}, ${email}, ${password}, ${host}) RETURNING id', newUser)
      .then(data => {
        console.log('In inner then of transaction, data = ', data);

        /*
        const q = t.none('INSERT_2 VALUES(...)', data.id);
        if (req.body.value != null) {
          return q.then(()=> t.none('INSERT_3 VALUES(...)', data.id));
        }
        return q;
        */
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
