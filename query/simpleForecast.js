const fmiRequest = require('../lib/fmiRequest');

const queryId = 'fmi::forecast::hirlam::surface::point::simple';
exports.queryId = queryId;
exports.params = ['place', 'latlng'];

exports.run = function runQuery(place) {
  return fmiRequest.get({ queryId, params: { place } })
    .then(results => Promise.resolve(results))
    .catch(err => console.log(err));
};

/**
 * Fetches forecasts by LatLng, eg. 61.23,23.31
 */
exports.runLatLng = function runQuery(latlon) {
  return fmiRequest.get({ queryId, params: { latlon } })
    .then(results => Promise.resolve(results))
    .catch(err => console.log(err));
};
