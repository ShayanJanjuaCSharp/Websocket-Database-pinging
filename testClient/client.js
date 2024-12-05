let ws;
if(ws){
    ws.onerror= ws.onopen = ws.onclose = ws.onmessage = null;
    ws.close();
}

ws = new WebSocket('ws://localhost:8080');
ws.onopen = () => {
    console.log('Connection Open.');
    ws.send('Hello,what');
}

ws.onmessage = (msg) => {
    console.log(msg.data);
}
ws.onclose = () => {
    ws = null
}