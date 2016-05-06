DROP TABLE IF EXISTS users_houses CASCADE;

CREATE TABLE users_houses (
  userId SERIAL PRIMARY KEY,
  houseId INTEGER,
  isHostHouse BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS houses CASCADE;
    
CREATE TABLE houses (
  id SERIAL PRIMARY KEY,
  inviteCode VARCHAR
);

DROP TABLE IF EXISTS devices CASCADE;
    
CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  houseId INTEGER,
  name VARCHAR,
  isActive BOOLEAN DEFAULT FALSE,
  hardwareKey VARCHAR,
  hardwareType VARCHAR,
  usageTimeOptions INTEGER,
  usageCostOptions INTEGER,
  deviceCategoryId INTEGER,
  totalTimeSpent INTEGER,
  totalCostSpent INTEGER
);


DROP TABLE IF EXISTS device_category CASCADE;
    
CREATE TABLE device_category (
  id SERIAL PRIMARY KEY,
  name INTEGER,
  defaultTime INTEGER,
  defaultCost INTEGER,
  defaultPhoto INTEGER
);


DROP TABLE IF EXISTS device_transactions CASCADE;
    
CREATE TABLE device_transactions (
  id SERIAL PRIMARY KEY,
  userAccountId INTEGER,
  deviceId INTEGER,
  amountSpent INTEGER,
  timeSpent INTEGER,
  timeStamp TIMESTAMP
);


DROP TABLE IF EXISTS pay_methods CASCADE;
    
CREATE TABLE pay_methods (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);


DROP TABLE IF EXISTS user_pay_accounts CASCADE;
    
CREATE TABLE user_pay_accounts (
  id SERIAL PRIMARY KEY,
  nickname INTEGER,
  accountId INTEGER,
  apiAccess VARCHAR,
  payMethodId INTEGER,
  userId INTEGER
);

DROP TABLE IF EXISTS users CASCADE;
    
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name INTEGER,
  defaultViewHost BOOLEAN
);


ALTER TABLE users_houses ADD FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE users_houses ADD FOREIGN KEY (houseId) REFERENCES houses (id);
ALTER TABLE devices ADD FOREIGN KEY (houseId) REFERENCES houses (id);
ALTER TABLE devices ADD FOREIGN KEY (deviceCategoryId) REFERENCES device_category (id);
ALTER TABLE device_transactions ADD FOREIGN KEY (userAccountId) REFERENCES user_pay_accounts (id);
ALTER TABLE device_transactions ADD FOREIGN KEY (deviceId) REFERENCES devices (id);
ALTER TABLE user_pay_accounts ADD FOREIGN KEY (payMethodId) REFERENCES pay_methods (id);
ALTER TABLE user_pay_accounts ADD FOREIGN KEY (userId) REFERENCES users (id);