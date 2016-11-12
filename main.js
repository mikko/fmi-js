const config = require('./config');
const listStoredQueries = require('./query/listStoredQueries');
const simpleForecast = require('./query/simpleForecast');
const latestObservations = require('./query/latestObservations');

//console.log(listStoredQueries.run(config.apiKey));

const testLocation = 'suinula';

simpleForecast.run(testLocation)
  .then((res) => {
    console.log(`Simple forecast for ${testLocation}`);
    console.log(res);
  })
  .catch(err => console.log(err));

latestObservations.run(testLocation)
  .then((res) => {
    console.log(`Latest observations for ${testLocation}`);
    console.log(res);
  })
  .catch(err => console.log(err));
