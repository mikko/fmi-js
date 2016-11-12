const fmiRequest = require('../lib/fmiRequest');

const queryId = 'describeStoredQueries';
exports.queryId = queryId;

exports.run = function runQuery() {
  console.log(`${baseUrl}${apiKey}/wfs?require=${queryId}`);
  fmiRequest.get(queryId)
  return 'KUKKUU';
};
