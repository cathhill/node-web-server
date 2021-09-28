const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b47ae6e976872c6c13ce18b07fb7564d&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  //json:true parses the data.
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". It is " +
          response.body.current.temperature +
          " degrees and feels like " +
          response.body.current.feelslike +
          " degrees."
      );
    }
  });
};

module.exports = forecast;
