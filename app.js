/**
 * A simple ExpressJS server app
 */

'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);

var logJson = {logs: []};

app.get('/', function(req, res) {

  // Toggle between serving public/index.html
  // and sending a text 'Ola Mundo!' to see
  // nodemon restarting the server upon edit

  res.sendfile('index.html');
//  res.send('Ola Mundo!');

});
app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.use('/build/command-input', express.static(path.resolve(__dirname, 'build/command-input')));
app.use('/build/command', express.static(path.resolve(__dirname, 'build/command')));
app.use('/build/log', express.static(path.resolve(__dirname, 'build/log')));
app.use('/build/service', express.static(path.resolve(__dirname, 'build/service')));
app.use('/build/settings', express.static(path.resolve(__dirname, 'build/settings')));
app.use('/css', express.static(path.resolve(__dirname, 'css')));
app.use('/node_modules', express.static(path.resolve(__dirname, 'node_modules')));

app.use('/getKnownCommands', express.static("data/known-cmds.json"));

app.get('/run', function(req, res) {
  var command = req.param("command");
  logJson.logs.push({
    logLevel: "INFO",
    message: "Processing command:'" + command + "' (0 left)",
    exception: null,
    time: 1458138685531
  });
  logJson.logs.push({
    "logLevel": "INFO",
    "message": "Syntax matched (executed): " + command,
    "exception": null,
    "time": 1458138685532
  });
  logJson.logs.push({
    "logLevel": "INFO",
    "message": "Command processed (0 ms)",
    "exception": null,
    "time": 1458138685535
  });
  res.sendStatus(200);
});

app.get('/getLogs', function(req, res) {
  res.json(logJson);
  logJson.logs.splice(0, logJson.logs.length);
});

app.use(express.static('public'));

server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
