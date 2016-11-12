const config = require('./config');
const listStoredQueries = require('./query/listStoredQueries');
const simpleForecast = require('./query/simpleForecast');

//console.log(listStoredQueries.run(config.apiKey));
simpleForecast.run('suinula')
  .then(res => console.log(res))
  .catch(err => console.log(err));
