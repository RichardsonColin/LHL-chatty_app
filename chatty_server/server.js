// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server ({ server });

// Monitors the current users to be sent and displayed client-side.
const userCounter = {
  type: 'users',
  connected: 0
};

const randomUsernameColour = () => {
  return '#'+Math.floor(Math.random()*16777215).toString(16)
};


const messageHandler = (message) => {
  switch(message.type) {
    case "postMessage":
      message.type = 'incomingMessage';
      return message;
      break;
    case "postNotification":
      message.type = 'incomingNotification';
      return message;
      break;
    default:
      console.log('error', message);
      // Show an error in the console if the message type is unknown
      throw new Error("Unknown event type " + message.type);
  }
};


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the socket parameter in the callback.
wss.on('connection', (socket) => {
  const connectionWelcome = {
    type: 'connected',
    content: 'Connected to server'
  }
  const userColour = randomUsernameColour();
  userCounter.connected++;

  console.log('Client connected');
  socket.send(JSON.stringify(connectionWelcome));

  socket.on('message', (message) => {
    const appMessage = JSON.parse(message);
    const handledMessage = messageHandler(appMessage);

    // Add a uniqu ID.
    handledMessage.id = uuidv4();

    // Add a unique colour to the user's name.
    handledMessage.colour = userColour;

    wss.broadcast(JSON.stringify(handledMessage));
    });

  wss.broadcast(JSON.stringify(userCounter));

  // Set up a callback for when a client closes the socket.
  socket.on('close', () => {
    userCounter.connected--;
    console.log('Client disconnected');
    wss.broadcast(JSON.stringify(userCounter));
  });
});