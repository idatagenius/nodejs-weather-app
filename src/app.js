const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialsPath)

// SEtup static directory to serve
app.use(express.static(publicDirectoryPath))

// Home Page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aditi D'
    })
})

// About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aditi D'
    })
})

// Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text: 'Some help text',
        name: 'Aditi D'
    })
})

// Help pages that are not there
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        error: 'Help article not found!',
        name: 'Aditi D'
    })
})

// Weather Page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// Every other page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        error: 'This page was not found',
        name: 'Aditi D'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})