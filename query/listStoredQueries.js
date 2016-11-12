const fmiRequest = require('../lib/fmiRequest');

const queryId = 'describeStoredQueries';
exports.queryId = queryId;

exports.run = function runQuery() {
  return fmiRequest.get(queryId)
    .then(results => Promise.resolve(results))
    .catch(err => console.log(err));
};
