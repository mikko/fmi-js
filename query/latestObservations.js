const fmiRequest = require('../lib/fmiRequest');

const queryId = 'fmi::observations::weather::simple';
exports.queryId = queryId;
exports.params = ['place'];

exports.run = function runQuery(place) {
  return fmiRequest.get({ queryId, params: { place } })
    .then(results => Promise.resolve(results))
    .catch(err => console.log(err));
};
