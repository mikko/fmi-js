"use strict";

const fileConfig = require('./config.json');

let apiKey = process.env.FMI_APIKEY;

if (apiKey === undefined && fileConfig.apiKey !== undefined) {
  apiKey = fileConfig.apiKey;
}

if (typeof apiKey !== 'string') {
  throw new Error('Missing fmi apikey. Api key can be given as environment variable FMI_APIKEY or in config.json');
}

exports.apiKey = apiKey;
