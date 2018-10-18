const net = require('net');

const server = net.createServer((socket) => {

}).on('error', (err) => {
  // handle errors here
  throw err;
})
server.on('connection', (data,err) => {
  console.log('connection created');
  data.end('goodbye\n');
})

server.on('end', data => {
  console.log('bye', data);
})

server.on('close', data => {
  console.log('bye2', data);
})

// grab an arbitrary unused port.
server.listen({
  host:'localhost',
  port: 5000}, () => {
  console.log('opened server on', server.address());
});
