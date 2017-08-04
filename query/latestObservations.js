const fmiRequest = require('../lib/fmiRequest');

const queryId = 'fmi::observations::weather::simple';
exports.queryId = queryId;
exports.params = ['place'];

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
