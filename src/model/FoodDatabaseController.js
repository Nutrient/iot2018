const request = require('async-request');

class FoodDatabaseController {

  async getUPCA(upca){
    let response;

    try {
      response = await request(`https://api.edamam.com/api/food-database/parser?upc=${upca}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_API_KEY}`);
      console.log(response.body);
    } catch (e) {
      console.log(e);
      throw e;
    }

  }
  async getRecipes(tags){
    let response;

    try {
      tags.forEach(async tag => {
          response = await request(`https://api.edamam.com/search?q=${tag}&app_id=${process.env.RECIPES_APP_ID}&app_key=${process.env.RECIPES_API_KEY}&from=0&to=3`);
      });

    } catch (e) {
      console.log(e);
      throw e;
    }

  }


}

module.exports = FoodDatabaseController;
