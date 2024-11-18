const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const connectDB = require('./config/db');
require('dotenv').config()

const app = express();
const PORT = process.env.port

// Serve static files or set up any routes if needed
app.get('/', (req, res) => {
  res.send('you are checking me right now');
});
connectDB()

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server on top of the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`You sent: ${message}`);
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
  });

  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server integrated with Express!');
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
 
});
