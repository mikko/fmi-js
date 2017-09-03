# fmi-js
Simple utility for fetching weather data in JSON format using FMI open data

## Usage

1. Get api token for FMI
1. Save api token in environment variable `FMI_APIKEY`
1. `npm start`

## Available queries

### Simple forecast

Weather forecast fetched to a specific location.

#### Parameters

* __place__, location for the forecast

### Latest observations

Real time weather observations from weather stations for the last 12 hours.

#### Parameters

* __place__, location for the observations

