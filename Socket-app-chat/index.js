
/**
 * The provided Node.js and Socket.IO code sets up a basic chat application where clients can communicate in real-time through a WebSocket connection.
 *  It begins by initializing an Express server (`app`) and integrating Socket.IO to facilitate bi-directional communication. 
 * The server listens on port 5000 and serves a single route ('/') that sends an HTML file (`index.html`) to clients upon request. 
When a client connects to the server via Socket.IO, the server logs the connection and sets up event listeners for two types of messages: `'send name'` and `'send message'`. 
When a client emits a `'send name'` event with a username or a `'send message'` event with a chat message, the server broadcasts these events to all connected clients using `io.emit()`. 
This ensures that all clients receive and can display the usernames and messages sent by other clients in real-time.
On the client side, the `index.html` file includes a basic form where users can enter their name and messages. The form is styled using Tailwind CSS for a modern look and feel. 
JavaScript within the HTML establishes a connection to the server via Socket.IO, listens for form submissions, and emits the corresponding `'send name'` and `'send message'` events to the server. 
When the client receives these events back from the server (via Socket.IO's `socket.on()`), it updates the UI dynamically to display the sent messages and usernames in a chat-like interface.
Overall, this setup demonstrates a foundational implementation of real-time messaging using Socket.IO and Node.js, 
suitable for building interactive applications where instant communication between clients is essential.
 */
const express = require('express'); 
const app = express(); 
const Server = require('socket.io'); 
const http = require('http'); 
const server = http.createServer(app); 
const io = require('socket.io')(server); 
const port = 5000; 

// Serve the index.html file when '/' route is accessed
app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html'); 
}); 

// Handle socket connections
io.on('connection', (socket) => { 
    console.log("A user connected"); 
    
    // Listen for 'send name' event from clients
    socket.on('send name', (username) => { 
        console.log("Received 'send name' event"); 
        // Broadcast 'send name' event to all clients
        io.emit('send name', username); 
    }); 

    // Listen for 'send message' event from clients
    socket.on('send message', (chat) => { 
        console.log("Received 'send message' event"); 
        // Broadcast 'send message' event to all clients
        io.emit('send message', chat); 
    }); 

    // disconnect 
    socket.on('disconnect' , () => {
        console.log("disconnected user");
    })
    
}); 

// Start server listening on specified port
server.listen(port, () => { 
    console.log(`Server is listening at the port: ${port}`); 
});
