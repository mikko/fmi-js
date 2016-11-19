const Hapi = require('hapi');
const observations = require('../query/latestObservations');
const forecast = require('../query/simpleForecast');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const server = new Hapi.Server({});
const port = 8000;

server.connection({ port });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    console.log(request.params.place);
    const html = fs.readFileSync(path.join(__dirname , 'index.html'));
    reply(_.template(html.toString())({ place: 'tampere' }));
  },
});

server.route({
  method: 'GET',
  path: '/{place}',
  handler: (request, reply) => {
    console.log(request.params.place);
    const html = fs.readFileSync(path.join(__dirname , 'index.html'));
    reply(_.template(html.toString())({ place: request.params.place }));
  },
});

server.route({
  method: 'GET',
  path: '/observation/{place}',
  handler: (request, reply) => {
    console.log('Observations for location', request.params.place);
    observations.run(request.params.place)
      .then(res => reply(res));
  },
});

server.route({
  method: 'GET',
  path: '/forecast/{place}',
  handler: (request, reply) => {
    console.log('Forecast for location', request.params.place);
    forecast.run(request.params.place)
      .then(res => reply(res));
  },
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running in port ${port}`);
});
