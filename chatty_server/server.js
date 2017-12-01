// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server ({ server });

const messageHandler = (message) => {
  switch(message.type) {
    case "postMessage":
      //console.log('message', message);
      message.type = 'incomingMessage';
      console.log('server', message);
      return message;
      break;
    case "postNotification":
      console.log('noti', message);
      message.type = 'incomingNotification';
      console.log('server', message);
      return message;
      break;
    default:
      console.log('error', message);
      // show an error in the console if the message type is unknown
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
// the ws parameter in the callback.
wss.on('connection', (socket) => {
  const connectionWelcome = {
    type: 'connected',
    content: 'Connected to server'
  }
  console.log('Client connected');

  socket.on('message', (message) => {
    const appMessage = JSON.parse(message);
    //console.log(appMessage);
    const handledMessage = messageHandler(appMessage);

    // Add a uniqu ID.
    handledMessage.id = uuidv4();

    console.log(`user ${handledMessage.username} said ${handledMessage.content}`);

    console.log('before send', handledMessage);

    wss.broadcast(JSON.stringify(handledMessage));
    });

  socket.send(JSON.stringify(connectionWelcome));

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => console.log('Client disconnected'));
});