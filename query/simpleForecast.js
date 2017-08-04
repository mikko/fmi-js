const fmiRequest = require('../lib/fmiRequest');

const queryId = 'fmi::forecast::hirlam::surface::point::simple';
exports.queryId = queryId;
exports.params = ['place', 'latlon'];

exports.run = function runQuery(place, starttime, endtime) {
  const params = {
    place
  };

  if (starttime !== undefined && endtime !== undefined) {
    params.starttime = starttime;
    params.endtime = endtime;
  }

  return fmiRequest.get({ queryId, params })
    .then(results => Promise.resolve(results))
    .catch(err => console.log(err));
};

/**
 * Fetches forecasts by LatLng, eg. 61.23,23.31
 */
exports.runLatLon = function runQuery(latlon, starttime, endtime) {
  const params = {
    latlon
  };

  if (starttime !== undefined && endtime !== undefined) {
    params.starttime = starttime;
    params.endtime = endtime;
  }

  return fmiRequest.get({ queryId, params })
    .then(results => Promise.resolve(results))
    .catch(err => console.log(err));
};
