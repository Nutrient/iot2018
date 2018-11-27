const request = require('async-request');
const MongoController = require('./MongoController');
const forEach = require('async-foreach').forEach;

const mongo = new MongoController('Fuddy');

class SensorController {
  async getInitial(collection){
    try {
      let mFound = await mongo.query(collection, {
        "count": {
          "$gt": 0
        }
      });
      return mFound;


    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}

module.exports = SensorController;
