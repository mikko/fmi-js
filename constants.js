const temperatureKey = 'temperature';
const pressureKey = 'pressure';
const humidityKey = 'humidity';


module.exports = {
  baseUrl: 'http://data.fmi.fi/fmi-apikey/',
  paramNames: {
    temperature: temperatureKey,
    t2m: temperatureKey,
    pressure: pressureKey,
    p_sea: pressureKey,
    humidity: humidityKey,
  },
};
