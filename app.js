'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const port = process.env.PORT || 5000;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  port: port,
});

// Add the route
server.route({
  method: 'GET',
  path:'/',
  handler: function (request, reply) {
    fs.readFile('./index.json', (err, data) => {
      reply(JSON.parse(data)).code(200);
    });
  },
});

// Start the server
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
