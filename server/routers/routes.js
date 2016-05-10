const userRoutes = require('./userRouter');
const express = require('express');
const path = require('path');
const srcPath = process.env.NODE_ENV === 'development' ? '/../src/' : '/../dist';

module.exports = (app, passport) => {
  app.use(express.static(path.join(__dirname, srcPath)));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, srcPath, '/index.html'));
  });

  app.use('/api/v1/users', userRoutes)(app, passport);
};
