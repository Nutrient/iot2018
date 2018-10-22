const request = require('async-request');


const pushTotalRecipesPerHour = async () => {
  try {
    let response = await request('https://api.thingspeak.com/update?api_key=T95XP7NVZQ29FFAZ&field2=50')

  } catch (e) {

  }

}

const fillRecipes = async () => {
  try {

  } catch (e) {

  }
}


pushTotalRecipesPerHour()



setInterval(pushTotalRecipesPerHour, 3600000)
