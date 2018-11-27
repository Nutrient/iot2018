//ppm normal 400
//temp normal 4

const MongoController = require('./MongoController');
let mongo = new MongoController('Fuddy');


//air generator
setInterval(async () => {
  await mongo.insertOne('air', {
    'value': Math.floor(Math.random() * 410) + 390,
    'time': Date.now()
  });
}, 60000);

//temp generator
setInterval(async () => {
  await mongo.insertOne('temp', {
    'value': (Math.random() * 5) + 4.8,
    'time': Date.now()
  });
}, 60000)
