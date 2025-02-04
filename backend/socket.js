const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Send a message to the client
  ws.send('Welcome to the WebSocket server!');
});

module.exports = wss;
