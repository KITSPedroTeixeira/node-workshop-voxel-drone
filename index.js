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

var rpc = require('rpc-stream')();

var commands = require('./browser/commands');

var drone = rpc.wrap(commands);

function handleWebsocket(websocket) {
  rpc.pipe(websocket).pipe(rpc, {end: false});
}

app.post('/takeoff', function(req, res) {
  drone.takeoff(function(err) {
    if (err) {
      res.status(500);
      res.send(err);
    }
    else {
      res.send({ok: true});
    }
  });
});
