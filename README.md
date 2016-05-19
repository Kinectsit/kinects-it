# kinectsit       

__An application for homeowners to rent out the appliances in their homes.__

####Master branch build status: ![](https://travis-ci.org/Kinectsit/kinects-it.svg?branch=master)

## __Table of Contents__

1. [Introduction](#Introduction)
2. [Requirements](#requirements)
3. [Development](#development)
    a. [Dependencies](#dependencies)
    b. [Tasks](#tasks)
4. [Team](#team)
5. [Resources] (#resources)
6. [Contributing](#contributing)

## __Introduction__

#### __How it works__

__Instructions for hosts__
1. Sign up for a host account on the website. You can use local sign-in for demo purposes - or you can use Coinbase to set up payments.
2. Plug your applicance into the power socket we provide *
3. Use the hardware code on that socket to add your device to the website.
4. Share your house code with any guests who stay in your house.
5. Start collecting payments and view detailed usage stats. 

__Instructions for house guests__
1. Sign up for a guest account on the website. You can use local sign-in for demo purposes, or to purchase device use, set up a Coinbase account.
2. Add your current rental to your account by using the code your host has provided. 
3. View all devices and activity on your dashboard. Click on a device to view previous transactions or purchase time. 
4. After paid usage expires, the power to that device turns off. 

> * You can create your own demo using Little Bits - read the hardware section below for more information.

## __Requirements__

### __Tech Stack__

#### Server
- Node 
- Express
- Postgres
- Redis

#### Client
- React 
- Redux 
- Material UI
- Foundation
- SASS
- Webpack

#### Hardware
- Provided

> Alternatively, you can create your own testing account using the Little Bits Smart Home Kit: Power, Button, CloudBit, AC & IR. Use the MAC address of your CloudBit in the device set up page, and add your access token to your config.js file.

#### APIs
- Little Bits <http://developers.littlebitscloud.cc/>
- Coinbase Connect <https://developers.coinbase.com/>
- Coinbase Merchant Checkout

#### Continuous Integration and Testing
- Mocha
- Supertest
- TravisCI - <https://travis-ci.org/Kinectsit/kinects-it>

#### Deployment
- AWS EC2 


## __Development__

### __Dependencies__

You should have the following applications installed on your local machine:
- NPM
- NodeJS
- Postgres
- Redis

### __Tasks__

From within the root directory:

Install node modules:
```sh
npm install
```

Set up Postgres database to handle persistent data:
```sh
createdb kinectdb -U postgres
psql -U postgres -d kinectdb -f ./server/config/schema.sql
```

Set up Redis server to handle device usage expiration times:
```sh
redis-server /usr/local/etc/redis.conf --port 6379
```

Start your server in development mode(localhost:3001)
```sh
npm start
```

Alternatively, start your server in production mode (localhost:3000). You will need to use production mode if you are interacting with Coinbase
```sh
npm run build
node server/server.js
```

Create a config.js file at the root level to store your API keys. You can find your access token for your Cloudbit by following these instructions: <http://developers.littlebitscloud.cc/access>, and you can get your Coinbase keys from this link: <https://www.coinbase.com/settings/api​>. Make sure you add this to your .gitignore file if it isn't alraedy.

```sh
module.exports = {
  ACCESS_TOKEN: '',
  COINBASE_CLIENT_ID: '',
  COINBASE_CLIENT_SECRET: '',
};
```

## __Roadmap__

### __User Flow__

The home dashboard is the primary screen for both guests and hosts. From there, each user can select a device - and depending on their role, interact with that device in different ways - including toggling the power on/off, paying for usage, and/or viewing transaction history.

![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")


#### __Client File Structure__

This project uses React with React-Router and Redux. The image below shows the primary files in the project, and how Redux interacts with them to manage an immutable state tree. 

#### Why we chose React
Having a responsive client-side for this application is important; users are quickly (and often!) navigating through many different pages. Because of that, we decided to build a single-page application using React. We chose React beause of its speed and modularity - we liked that we were able to separate concerns and we also liked the number of useful libraries (like React Router and Redux) that supported the framework. Additionally, React Native is quickly gaining credibility in developer circles - and transitioning this application to a mobile application (which it is a natural fit for) would be fairly simple.

#### Why we chose Redux 
Redux was the missing piece we need to build out our file structure. It allowed us to handle state in a more controlled way (a centralized, immutable state tree), and also allowed us to pass only the information down that was necessary (so we didn’t have to bog down each page with unncessary information). If you are not familiar with Redux, the following resources may be useful: 
1. Logger middleware for Redux (open Chrome Console when interacting with code to see state tree) <https://github.com/theaqua/redux-logger>
2. Egghead tutorial from creator of Redux: <https://egghead.io/series/getting-started-with-redux>
3. Full-stack Redux tutorial: <http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html>
4. Redux Boilerplate (we used components of this): <https://github.com/coryhouse/react-slingshot>

![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")


### __Server Architecture__ 

Currently, there is one server, which interacts with two APIs, and two databases. Postgres holds relational and persisent data (schema below), and Redis stores the expiration time for devices in use by a guest. 

#### Why we chose Node
Our front-end was written using JavaScript so we chose Node to keep the language consistent between both sides of the application - this allowed the development team to work on both sides of the application. We also used Express to abstract away unncessary complexity, particulary with parsing requests and responses.

#### Why we chose Postgres
Relationships are important in our application - so we wanted a relational database that could handle this complexity. We chose Postgres because of its ability to scale and fast lookup times. We chose not to use an ORM because it wasn’t necessary to abstract out our interactions with Postgres. We ended up using a library called pgPromise that made structuring queries a bit cleaner.

#### Why we chose Redis
We needed to run an ongoing cron job (once per minute) to deal with toggling off devices with “expired time” for guests. Redis allowed us to keep and delete this data in an fast and efficient key-value store. We chose Redis over other non-persistent databases because of the functionality to sort sets based on a ‘score’ (see here: <http://redis.io/commands/ZRANGE>). The score we used for each guest device was the expiration time in milliseconds. Adding and returning items from this set has time complexities of O(log(N)) and O(log(N) + M).

![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")


### __Database Schema__ 

#### Schema decisions and backlog issues:
1. There is a join table between users and houses right now (USERS_HOUSES), even though the current application is built to only handle one house per user at a time. Allowing users to be in multiple houses is currently in the backlog, so we built our database to support that future possibility.
2. The PAY_METHODS table needs to be pre-populated with payment options. Currently, the only option is Coinbase and a Demo method (empty).
3. The DEVICES table has two fields for caching total time spent and total cost spent (for a more efficent lookup). This is not currently being utilized (backlog).
4. The DEVICE_CATEGORY table is not currently being used (backlog).
5. The DEVICE_TRANSACTIONS table holds ALL device transactions, so dealing with this data is not as efficient as we'd like. The backlog has an open issue for creating a query cache.

![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")


### __Database Schema__ 

#### Schema decisions and backlog issues:
1. There is a join table between users and houses right now (USERS_HOUSES), even though t










// TEST THE DEVICE IN YOUR TERMINAL
// curl -XPOST https://api-http.littlebitscloud.cc/devices/00e04c038343/output \
//     -H 'Authorization: Bearer c585ac4524b44283515b3c11f860a8bd0e7283154f683b2e1ab1702888be4bc7' \
//     -H 'Accept: application/vnd.littlebits.v2+json' \
//     -H 'Content-Type: application/json' \
//     -d '{"duration_ms":100}'

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Team

  - __Product Owner__: Bucko Perley
  - __Scrum Master__: Bryan Newby
  - __Development Team Members__: Krista Moroder, Bucko Perley, Bryan Newby



## Contributing

### __Backlog__

1. Add a third database to store device transaction query data (stored for lookup per device, and/or by user).
3. Add the ability for users to be both a host and a guest.
4. Allow hosts or guests to be in multiple houses at once.
5. Integrate additional payment options.

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
