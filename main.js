const listStoredQueries = require('./query/listStoredQueries');

listStoredQueries.run()
  .then((res) => {
    listStoredQueries.renderMarkdown(res);
  });

