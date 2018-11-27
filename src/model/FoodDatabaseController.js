const request = require('async-request');
const MongoController = require('./MongoController');
const forEach = require('async-foreach').forEach;

const mongo = new MongoController('Fuddy');

class FoodDatabaseController {

  async addProduct(parseResponse){
    try {
      let obj = {
        _id: parseResponse.text.split(':')[1],
        food: parseResponse.hints[0].food,
        count: 1

      };
      let mFound = await mongo.readOne('food', obj._id);
    //  console.log(mFound);
      if (mFound.length === 0) {
        await mongo.insertOne('food', obj);
      } else {
        let res = await mongo.updateOne('food',  mFound[0]._id, {count: ++mFound[0].count})
      }
    } catch (e) {
      console.log(e);
      throw e;
    }

  }

  async addProductStandAlone(id){
    try {
      let mFound = await mongo.readOne('food', id);
    //  console.log(mFound);
      if (mFound.length > 0) {
        let res = await mongo.updateOne('food',  mFound[0]._id, {count: ++mFound[0].count})
      }

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async removeProduct(id){
    try {
      let mFound = await mongo.readOne('food', id);
      console.log(id);
      console.log(mFound);
      if (mFound.length > 0) {
        let res = await mongo.updateOne('food',  mFound[0]._id, {count: --mFound[0].count})
      }

    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getProductsInitial(){
    try {
      let mFound = await mongo.query('food', {
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

  async getRecipesInitial(){
    try {
      let mFound = await mongo.readAll('recipes');
      return mFound
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getUPCA(upca){
    let response;

    try {
      response = await request(`https://api.edamam.com/api/food-database/parser?upc=${upca}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_API_KEY}`);
      //console.log(JSON.parse(response.body));

      await this.addProduct(JSON.parse(response.body));
      await this.storeRecipes(JSON.parse(response.body).hints[0].food.foodContentsLabel.trim().split(';'), JSON.parse(response.body).text.split(':')[1]);


      return response;
    } catch (e) {
      console.log(e);
      throw e;
    }

  }
  async storeRecipes(tags, id){
    let response;

    try {

      forEach(tags, async tag => {
        try {
          response = await request(`https://api.edamam.com/search?q=${tag}&app_id=${process.env.RECIPES_APP_ID}&app_key=${process.env.RECIPES_API_KEY}&from=0&to=3`);
          //console.log(id, JSON.parse(response.body).hits);
        //  console.log(response.body);
        //console.log(response.body.replace(/<\/?[^>]+(>|$)/g));
          forEach(JSON.parse(response.body.replace(/<\/?[^>]+(>|$)/g)).hits, async recipe => {
            //console.log(recipe);
            try {
              let mFound = await mongo.readOne('recipes', `${id}${recipe.recipe.label.replace(/\s/g,'')}`);
              console.log(`${id}${recipe.recipe.label.replace(/\s/g,'')}`);
              console.log('mfound:', mFound);
              if (mFound.length == 0) {
                let obj = {
                  _id: `${id}${recipe.recipe.label.replace(/\s/g,'')}`,
                  ...recipe.recipe
                };
                if (obj.totalNutrients['SUGAR.added']) {
                  obj.totalNutrients['SUGAR_added'] = obj.totalNutrients['SUGAR.added'];
                  delete obj.totalNutrients['SUGAR.added'];
                }
                //console.log(obj.totalNutrients['SUGAR.added']);
                await mongo.insertOne('recipes', obj);
              }
            } catch (e) {
            //console.log(e);
            }
          })
        } catch (e) {
          console.log(e);
        }

      });

    } catch (e) {
      console.log(e);
      throw e;
    }

  }


}

module.exports = FoodDatabaseController;
