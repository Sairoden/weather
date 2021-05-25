const request = require("request");
const { WEATHERSTACK } = require("./config");

exports.forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK}&query=${lat},${lng}&units=f`;

  request({ url, json: true }, (err, res) => {
    if (err) return callback("Unable to connect to weather service!");

    if (res.body.error) return callback("Unable to find location");

    const { current } = res.body;
    callback(
      undefined,
      `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees`
    );
  });
};
