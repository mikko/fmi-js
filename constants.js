const temperatureKey = 'temperature';
const pressureKey = 'pressure';
const humidityKey = 'humidity';

const symbolMap = {
	1: "selkeää",
	2: "puolipilvistä",
	21: "heikkoja sadekuuroja",
	22: "sadekuuroja",
	23: "voimakkaita sadekuuroja",
	3: "pilvistä",
	31: "heikkoa vesisadetta",
	32: "vesisadetta",
	33: "voimakasta vesisadetta",
	41: "heikkoja lumikuuroja",
	42: "lumikuuroja",
	43: "voimakkaita lumikuuroja",
	51: "heikkoa lumisadetta",
	52: "lumisadetta",
	53: "voimakasta lumisadetta",
	61: "ukkoskuuroja",
	62: "voimakkaita ukkoskuuroja",
	63: "ukkosta",
	64: "voimakasta ukkosta",
	71: "heikkoja räntäkuuroja",
	72: "räntäkuuroja",
	73: "voimakkaita räntäkuuroja",
	81: "heikkoa räntäsadetta",
	82: "räntäsadetta",
	83: "voimakasta räntäsadetta",
	91: "utua",
	92: "sumua",
};

module.exports = {
  baseUrl: 'http://data.fmi.fi/fmi-apikey/',
  paramNames: {
    temperature: temperatureKey,
    t2m: temperatureKey,
    pressure: pressureKey,
    p_sea: pressureKey,
    humidity: humidityKey,
    symbols: symbolMap,
  },
};
