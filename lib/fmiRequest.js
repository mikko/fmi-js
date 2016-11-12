const Promise = require('bluebird');
const _ = require('lodash')
const http = require('http');
const baseUrl = require('../constants').baseUrl;
const config = require('../config');

const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser();

const parseTemperatureForecast = function parseTemperatureForecast(xml) {
  let forecast = [];
  xml['wfs:FeatureCollection']['wfs:member'].forEach(memberElem => {
    const forecastElem = memberElem['BsWfs:BsWfsElement'][0];
    if (forecastElem['BsWfs:ParameterName'][0] === 'Temperature') {
      const time = forecastElem['BsWfs:Time'][0];
      const temperature = forecastElem['BsWfs:ParameterValue'][0];
      forecast.push({
        time,
        temperature,
      });
    }
  });

  return forecast;
};

exports.get = function get(queryId, params) {
  return new Promise((resolve, reject) => {
    const queryParams = params || {};

    let paramString = '';
    if (Object.keys(queryParams).length > 0) {
      // Build a query string by joining parameter keys and values with '=' and
      // parameters with '&'
      paramString = '&' + _.toPairs(queryParams).map(param => param.join('=')).join('&');
    }
    const url = `${baseUrl}${config.apiKey}/wfs?request=getFeature&storedquery_id=${queryId}${paramString}`;
    console.log(`Calling ${url}`);
    http.get(url, (response) => {
      response.setEncoding('utf8');

      let responseText = '';
      response.on('data', (chunk) => {
        responseText += chunk;
      });
      response.on('end', () => {
        xmlParser.parseString(responseText, (err, result) => {
          if (err) {
            reject(err);
          }
          const forecast = parseTemperatureForecast(result);
          //console.dir(result);
          resolve(forecast);
        })
      });

      // consume response body
      response.resume();
    }).on('error', e => reject(e));
  });
};
