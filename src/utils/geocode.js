const request = require("request");
const { GEOCODE } = require("./config");

exports.geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${GEOCODE}&limit=1`;

  request({ url, json: true }, (err, res) => {
    if (err) return callback("Unable to connect to location services!");

    if (res.body.features.length === 0)
      return callback("Unable to find location. Try another search");

    const { features } = res.body;
    callback(undefined, {
      latitude: features[0].center[1],
      longitude: features[0].center[0],
      location: features[0].place_name,
    });
  });
};
