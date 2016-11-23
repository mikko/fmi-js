const simpleForecast = require('./query/simpleForecast');
const latestObservations = require('./query/latestObservations');

module.exports = {
	simpleForecast: simpleForecast.run,
	latestObservations: latestObservations.run
};
