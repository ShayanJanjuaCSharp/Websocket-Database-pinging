 const http = require('http');
const { measureMemory } = require('vm');
 const WebSocket = require('ws');

 const port = 8080;
 const server = http.createServer();
 const wss = new WebSocket.Server({ server });

 const users = new Map();

 wss.on('connection', function connection(ws) {
   ws.on('message', function incoming(message) {
      const messageComp = message.split(',');
      const userId = messageComp[0];
      const targetId = messageComp[1];
      users.set(userId, client);
      wss.clients[targetId].send(message);
   });
   ws.on('close', function close() {
    console.log('Lost Connection');
   });
});

server.listen(port, function listening() {
   console.log('Listening on %d', server.address().port);
})