var request = require('request');

var forecast = (latitude, longitude, callback) => {
    var url = 'https://api.darksky.net/forecast/af6b6d41024d0427bd2a2298c3c86d2d/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if(body.error) {
            callback('Unable to find the location weather. Try another search.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
};

module.exports = forecast;