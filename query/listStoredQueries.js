const fs = require('fs');
const fmiRequest = require('../lib/fmiRequest');

const queryId = 'describeStoredQueries';
exports.queryId = queryId;

const xmlFirstLevel = 'DescribeStoredQueriesResponse';
const xmlSecondLevel = 'StoredQueryDescription';

exports.run = function runQuery() {
  return fmiRequest.rawGet({ path: `request=${queryId}` })
    .then((results) => {
      const storedQueries = results[xmlFirstLevel][xmlSecondLevel].map((xmlDesc) => {
        const rawAbstract = xmlDesc.Abstract[0];
        const abstract = typeof rawAbstract === 'string' ? rawAbstract.replace(/(\r\n|\n|\r)/gm, '').trim() : '';
        return {
          title: xmlDesc.Title,
          queryId: xmlDesc.$.id,
          abstract,
          parameters: xmlDesc.Parameter.map((param) => {
            const rawParamAbstract = param.Abstract[0];
            const paramAbstract = typeof rawParamAbstract === 'string' ? rawParamAbstract.replace(/(\r\n|\n|\r)/gm, '').trim() : '';
            return {
              name: param.$.name,
              type: param.$.type,
              title: param.Title,
              abstract: paramAbstract,
            };
          }),
        };
      });
      return Promise.resolve(storedQueries);
    })
    .catch(err => console.log('Error in getting storedQueries', err));
};

exports.renderMarkdown = (doc) => {
  const md = doc.map(storedQuery => (
    `

## ${storedQuery.title}

__${storedQuery.queryId}__

${storedQuery.abstract}
### Parameters

| Name | Type | Title | Abstract |
| --- | --- | --- | --- |
| ${storedQuery.parameters.map(param => `${param.name} | ${param.type} | ${param.title} | ${param.abstract}`).join(' \n ')} |


`)).join('\n');
  fs.writeFileSync('storedQueries.md', `# Stored queries\n${md}`);
};
