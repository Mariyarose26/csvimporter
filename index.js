'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');
const Router = express.Router;
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 9000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Got a POST request');
  const input = document.getElementById('csv-input');
  input.addEventListener('change', function (event) {
//Add CSV link
  });
});

app.use('/upload-csv', router);

// Start server
function startServer() {
  server.listen(port, function () {
    console.log('Express server listening on ', port);
  });
}

setImmediate(startServer);
