require('dotenv').config();
const net = require('net');
const express = require('express');

const recipes = require('./src/thingspeak/recipes');
const FoodDatabaseController = require('./src/model/FoodDatabaseController');

const app = express();
const port = process.env.PORT || 3000;

let foodControl = new FoodDatabaseController();

const server = net.createServer((socket) => {
//  socket.on('error', err => {})

  socket.on('error', (err) => {
    // handle errors here
    console.log('err', err);
  })
  socket.on('connection', (data,err) => {
    console.log('connection created');
  })
  socket.on('data',async data => {
    let buffer = new Buffer.from(data, 'utf8');


    //console.log('buffer', buffer);
    //console.log('buffer length', buffer.length);
    await foodControl.getUPCA(data.slice(2, 13).toString('utf8'));


  })
  socket.on('end', data => {
    console.log('end', data);
  })
  socket.on('close', data => {
    console.log('close', data);

  })
})
// grab an arbitrary unused port.
server.listen({
  host:'0.0.0.0',
  port: 5000}, () => {
  console.log('opened server on', server.address());
});


app.get('/',(req, res) => {
  res.status(200).send({msg:'hello from root'});
})

app.listen(port, async function(err){
  console.log('running on server on port: ' + port);

});
