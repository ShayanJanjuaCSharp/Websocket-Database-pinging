const http = require('http');
const { measureMemory } = require('vm');
const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const server = http.createServer();
const wss = new WebSocket.Server({ server });

const users = new Map();
const usersReverse = new Map();

wss.on('connection', function connection(client) {
    console.log('New Connection at IP ' + client._socket.remoteAddress);
    client.on('message', function incoming(message) {
        console.log(message.toString());
        const messageComp = message.toString().split(',');
        const userId = messageComp[0];
        const targetId = messageComp[1];
        if(!users.has(userId)){
            users.set(userId, client);
            usersReverse.set(client, userId);
            if(users.has(targetId)){
                wss.clients[targetId].send(targetId);
            }else{
                console.log('client not online')
            }
        
        }
        console.log(userId);
        console.log(users.size);
    });
    client.on('close', function close() {
        console.log('Lost Connection');
        const userId = usersReverse.get(client);
        users.delete(userId);
        usersReverse.delete(client);
        console.log(users.size);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);  
});