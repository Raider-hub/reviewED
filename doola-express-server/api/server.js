

// api/server.js
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Handle all routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// module.exports.handler = serverless(app);
module.exports = app;
