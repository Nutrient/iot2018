const net = require('net');

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
