var request = require('request');

var geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlzaGFudGhuaXoiLCJhIjoiY2p6czhtaHc3MGRtaDNlcjE0a3RsZ203aCJ9.0Z231v9jYlm2hU2o3xNCiA';
    request({ url, json: true }, (error, { body }) => {
            if(error) {
                callback('Unable to connect to location service!', undefined);
            } else if(body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined);
            } else {
                callback(undefined, {
                    location: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0]
                });
            }
        }
)};

module.exports = geocode;