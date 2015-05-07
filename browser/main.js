var websocket = require('websocket-stream');
var ws = websocket('ws://localhost:3000');

ws.once('connect', function() {
  console.log('connected');
});