'use strict';

/*
  Terrible, but works....

  STEPS TO RUN:

  1) postgres must be running
  2) from psql prompt, drop kinectdb:
         drop database kinectdb;

  3) from project directory:
    createdb kinectdb -U postgres
    psql -U postgres -d kinectdb -f ./server/config/schema.sql
    node dummyData.js
*/

const bcrypt = require('bcrypt-nodejs');
const db = require('./server/db.js');
const User = require('./server/models/userModel');

const guestPassword = bcrypt.hashSync('12345', bcrypt.genSaltSync(8), null);
const hostPassword = bcrypt.hashSync('12345', bcrypt.genSaltSync(8), null);

const hostUser = { name: 'hostBob',
  email: 'hostBob@bob.com',
  password: hostPassword,
  host: 'host',
  home: 'Bob\'s',
  defaultviewhost: true,
  avatarURL: '',
  coinbaseId: '' };

const guestUser = { name: 'guestBob',
  email: 'guestBob@bob.com',
  password: guestPassword,
  host: 'guest',
  defaultviewhost: false,
  avatarURL: '',
  coinbaseId: '' };

let guest = null;
let host = null;
let homeId = null;
let deviceId1 = null;
let deviceId2 = null;
let deviceId3 = null;

User.create(guestUser)
  .then((data) => {
    console.log('Succesfully created guest = ', data);
    guest = data;
    return User.create(hostUser);
  })
  .then((hostData) => {
    console.log('Succesfully created host = ', hostData);
    host = hostData;
    homeId = hostData.user.house.id;

    console.log('guest = ', guest);
    console.log('host = ', host);

    const newDevice1 = {
      houseId: homeId,
      name: 'George',
      description: 'Washing Machine',
      isactive: true,
      deviceId: '00e04c038343',
      usagecostoptions: 1,
    };
    return db.one('INSERT INTO devices(id, houseId, name, description, isactive, hardwarekey, usagecostoptions) VALUES(${deviceId}, ${houseId}, ${name}, ${description}, ${isactive}, ${deviceId}, ${usagecostoptions}) RETURNING *', newDevice1);
  })
  .then((result) => {
    console.log('SUCCESS adding device1:', result);

    deviceId1 = result.id;

    const newDevice2 = {
      houseId: homeId,
      name: 'Paul',
      description: 'Dryer',
      isactive: false,
      deviceId: '11234lj234',
      usagecostoptions: 1,
    };
    return db.one('INSERT INTO devices(id, houseId, name, description, isactive, hardwarekey, usagecostoptions) VALUES(${deviceId}, ${houseId}, ${name}, ${description}, ${isactive}, ${deviceId}, ${usagecostoptions}) RETURNING *', newDevice2);
  })
  .then((result) => {
    console.log('SUCCESS adding device2:', result);
    deviceId2 = result.id;

    const newDevice3 = {
      houseId: homeId,
      name: 'John',
      description: 'Blender',
      isactive: false,
      deviceId: 'klj32454j4aso',
      usagecostoptions: 1,
    };
    return db.one('INSERT INTO devices(id, houseId, name, description, isactive, hardwarekey, usagecostoptions) VALUES(${deviceId}, ${houseId}, ${name}, ${description}, ${isactive}, ${deviceId}, ${usagecostoptions}) RETURNING *', newDevice3);
  })
  .then((result) => {
    console.log('SUCCESS adding device3:', result);
    deviceId3 = result.id;

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 100,
      timespent: 1000,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 250,
      timespent: 1700,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId1,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })




  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 250,
      timespent: 1700,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId2,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 250,
      timespent: 1700,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);

    // create all the transactions
    const deviceTransaction = {
      useraccountid: parseInt(guest.payAccounts[0].id),
      deviceid: deviceId3,
      amountspent: 200,
      timespent: 1500,
    };
    // Add to the device transaction database
    return db.one('INSERT INTO device_transactions(useraccountid, deviceid, amountspent, timespent) VALUES(${useraccountid}, ${deviceid}, ${amountspent}, ${timespent}) RETURNING *', deviceTransaction);
  })
  .then((result) => {
    console.log('SUCCESS adding transaction:', result);
  });

