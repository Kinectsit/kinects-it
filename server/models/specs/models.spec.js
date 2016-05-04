import { expect } from 'chai';
const db = require('../../db');

// const UsersHouses = require('../usersHousesModel');
// const House = require('../houseModel');
// const Device = require('../deviceModel');
// const DeviceCategory = require('../deviceCategoryModel');
// const DeviceTransaction = require('../deviceTransactionModel');
// const PayMethods = require('../payMethodsModel');
// const UserPayAccount = require('../userPayAccountModel');
const User = require('../userModel');

describe('The database', () => {
  const users = [
    { name: 'Jon Snow', defaultViewHost: 'true' },
    { name: 'Arya Stark', defaultViewHost: 'true' },
  ];

  // will drop and recreate all tables before running tests
  before((done) => {
    db.sync({ force: true })
      .then(() => { done(); })
      .catch((err) => { console.log(err); });
  });

  // will drop and recreate all tables after running tests
  // after((done) => {
  //   db.sync({ force: true })
  //     .then(() => { done(); })
  //     .catch((err) => { console.log(err); });
  // });

  it('should receive a new user from the model', (done) => {
    User.create(users[0])
      .then((res) => {
        expect(res.dataValues.name).to.equal(users[0].name);
        done();
      });
  });

  it('should find a user that was added to the database', (done) => {
    User.create(users[1])
      .then(() => {
        User.findOne({ where: { name: 'Arya Stark' } })
          .then((res) => {
            expect(res.dataValues.name).to.equal(users[1].name);
            done();
          });
      });
  });

  // needs test for all models, for adding foreign keys, and for controllers
});

