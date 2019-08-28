var express = require('express');
var path = require('path');
var hbs = require('hbs');
var geocode = require('./utils/geocode');
var forecast = require('./utils/forecast');

var app = express();

// Define Paths for Express config
var publicDirectory = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handerlbars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nishanth'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nishanth'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'May I help you?',
        name: 'Nishanth'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        };

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            };

            res.send({
                location: location,
                forecast: forecastData
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.find){
        return res.send('Error Product Not Found')
    }

    console.log(req.query.find);
    res.send({
        Products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Help article not found',
        name: 'Nishanth'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Page Not Found',
        name: 'Nishanth'
    });
});

app.listen(3000, () => {
    console.log('Server is Running');
});