var http = require('http');
var WebSocketServer = require('websocket').server;

var server = http.createServer(function(request, res){
    console.log((new Date()) + 'Recieved request for ' + request.url);
    res.writeHead(404);
    res.end();
});
server.listen(8080, function(){
    console.log((new Date()) + ' Server is listening on port 8080');
});

ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin){
    return true;
}

ws.on('request', function(req){
    if(!originIsAllowed(req.origin)){
        req.reject();
        console.log((new Date()) + ' Connection from origin ' + req.origin + ' rejected.')
    }

    var con = req.accept('echo-protocol', req.origin);
    console.log((new Date()) + ' Connection accepted.');

    con.on('message', function(message){
        if(message.type === 'utf8'){
            console.log('Received Message: ' + message.utf8Data);
            con.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary'){
            console.log('Recieved Binary Message of ' + message.binaryData.length + ' bytes');
            con.sendBytes(message.binaryData)
        }
    });
    con.on('close', function(reasonCode, desc){
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

});