const apiKey = process.env.FMI_APIKEY;

if (typeof apiKey !== 'string') {
  throw new Error('Missing fmi apikey. Api key can be given as environment variable FMI_APIKEY');
}

exports.apiKey = apiKey;
