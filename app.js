'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Fs = require('fs');
const Path = require('path');
const port = process.env.PORT || 5000;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  port: port,
});

server.register(Inert, () => {});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    Fs.readFile('./index.json', (err, data) => {
      reply(JSON.parse(data)).code(200);
    });
  },
});

server.route({
  method: 'GET',
  path: '/dist/{param*}',
  handler: {
    directory: {
      path: 'dist',
      listing: true,
    },
  },
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
