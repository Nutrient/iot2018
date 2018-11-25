const express = require('express');
const sensorRouter = express.Router();
const path = require('path');


sensorRouter.route('/air')
  .get((req, res) => {
      res.sendFile(path.resolve('public/html/air.html'))
  });
  
sensorRouter.route('/temp')
  .get((req, res) => {
      res.sendFile(path.resolve('public/html/temp.html'))
  });

module.exports = sensorRouter;
