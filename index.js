const net = require('net');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const server = net.createServer((socket) => {

}).on('error', (err) => {
  // handle errors here
  throw err;
})
server.on('connection', (data,err) => {
  console.log('connection created');
})

server.on('data', data => {
  console.log(data);
})

server.on('end', data => {
  console.log('end', data);
})

server.on('close', data => {
  console.log('close', data);
})

// grab an arbitrary unused port.
server.listen({
  host:'localhost',
  port: 5000}, () => {
  console.log('opened server on', server.address());
});

app.get('/',(req, res) => {
  res.status(200).send({msg:'hello from root'});
})

app.listen(port, function(err){
  console.log('running on server on port: ' + port);
});
