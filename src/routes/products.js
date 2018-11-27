const express = require('express');
const productRouter = express.Router();
const path = require('path');

const FoodDatabaseController = require('../model/FoodDatabaseController');
let foodControl = new FoodDatabaseController();



productRouter.route('/inventory')
  .get((req, res) => {
      res.sendFile(path.resolve('public/html/products.html'))
  });

productRouter.route('/recipes')
  .get((req, res) => {
      res.sendFile(path.resolve('public/html/recipes.html'))
  });


productRouter.route('/item')
  .post((req, res) => {
    foodControl.getUPCA(req.body.code).then(data => {
      res.status(200).send(data);;
    }).catch(err => {
      console.log(err);
    })
  })



module.exports = productRouter;
