const Promise = require('bluebird');
const _ = require('lodash')
const http = require('http');
const constants = require('../constants');
const config = require('../config');

const baseUrl = constants.baseUrl;
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser();

const parseFMIResponse = function parseTemperatureForecast(xml) {
  const forecast = [];
  xml['wfs:FeatureCollection']['wfs:member'].forEach((memberElem) => {
    const forecastElem = memberElem['BsWfs:BsWfsElement'][0];
    const time = forecastElem['BsWfs:Time'][0];
    const paramName = constants.paramNames[forecastElem['BsWfs:ParameterName'][0].toLowerCase()];
    const paramValue = forecastElem['BsWfs:ParameterValue'][0];
    if (paramName === undefined) {
      return;
    }
    const paramObject = {
      time,
    };
    paramObject[paramName] = paramValue;
    forecast.push(paramObject);
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
          resolve(parseFMIResponse(result));
        });
      });

      // consume response body
      response.resume();
    }).on('error', e => reject(e));
  });
};
