var express = require('express');
var join = require('path').join;

var app = express();

app.use(function(req, res, next) {
  console.log('hey there');
  next();
});

app.use(express.static(join(__dirname, 'browser')));

var server = app.listen(3000, function() {
  console.log('HTTP server listening on %j', server.address());
});

var websocket = require('websocket-stream');
var wss = websocket.createServer({server: server}, handleWebsocket);

function handleWebsocket(websocket) {
  console.log('I HAZ WEBSOCKET');
}
