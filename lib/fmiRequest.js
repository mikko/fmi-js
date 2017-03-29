const Promise = require('bluebird');
const _ = require('lodash');
const http = require('http');
const constants = require('../constants');
const config = require('../config');
const xml2js = require('xml2js');

const baseUrl = constants.baseUrl;
const xmlParser = new xml2js.Parser();

const parseFMIResponse = (xml) => {
  const forecast = [];

  if (!xml['wfs:FeatureCollection']) {
    return forecast;
  }

  xml['wfs:FeatureCollection']['wfs:member'].forEach((memberElem) => {
    const forecastElem = memberElem['BsWfs:BsWfsElement'][0];
    const time = forecastElem['BsWfs:Time'][0];
    let paramName = constants.paramNames[forecastElem['BsWfs:ParameterName'][0].toLowerCase()];
    const rawParamValue = forecastElem['BsWfs:ParameterValue'][0];
    const paramValue = isNaN(rawParamValue) ? rawParamValue: parseFloat(rawParamValue);

    if (paramName === undefined) {
      paramName = forecastElem['BsWfs:ParameterName'][0].toLowerCase();
    }
    const forecastItem = forecast.find(item => item.time === time);
    if (forecastItem !== undefined) {
      forecastItem[paramName] = paramValue;
    } else {
      const paramObject = {
        time,
      };
      paramObject[paramName] = paramValue;
      forecast.push(paramObject);
    }
  });
  return forecast;
};

const callFMI = ({ url, readyHandler }) => (
  new Promise((resolve, reject) => {
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
          if (readyHandler !== undefined) {
            resolve(readyHandler(result));
          } else {
            resolve(result);
          }
        });
      });

      // consume response body
      response.resume();
    }).on('error', e => reject(e));
  })
);

exports.get = function get({ queryId, params }) {
  const queryParams = params || {};

  let paramString = '';
  if (Object.keys(queryParams).length > 0) {
    // Build a query string by joining parameter keys and values with '=' and
    // parameters with '&'
    paramString = `&${_.toPairs(queryParams).map(param => param.join('=')).join('&')}`;
  }
  const url = `${baseUrl}${config.apiKey}/wfs?request=getFeature&storedquery_id=${queryId}${paramString}`;
  return callFMI({ url, readyHandler: parseFMIResponse });
};

exports.rawGet = function rawGet({ path }) {
  const url = `${baseUrl}${config.apiKey}/wfs?${path}`;
  return callFMI({ url });
};
