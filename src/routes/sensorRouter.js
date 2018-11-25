const express = require('express');
const sensorRouter = express.Router();

sensorRouter.route('/')
  .get((req, res) => {
    res.send('public/html/index.html')
  });

module.exports = sensorRouter;
