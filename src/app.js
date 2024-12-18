const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // point to custom directory which is "templates/views", default is "views"
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set( 'view engine', 'hbs' )
app.set( 'views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use( express.static( publicDirectoryPath  ) )

app.get( '', (req,res) => {
    res.render( 'index', { // render the index.hbs, only need name, extension not needed
        title: 'Weather',
        name: 'Duan'
    } ) 
})

app.get( '/about', (req,res) => {
    res.render( 'about', { // render the index.hbs, only need name, extension not needed
        title: 'About Me',
        name: 'Duan',
    } ) 
})

app.get( '/help', (req,res) => {
    res.render( 'help', { // render the index.hbs, only need name, extension not needed
        title: 'Help Page',
        name: 'Duan',
        message: 'This is the help page',
    } ) 
})

app.get( '/help/*' , (req,res) => {
    res.render( 'help404', {
        title: '404 Error',
        errorMessage : 'Help article not found'
    } ) 
})

app.get( '/weather', ( req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You have to provide an address'
        })
    } 
    geocode( req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error) {
            return res.send ({error})
        }
        forecast( latitude, longitude, ( error, forecastData ) => {
            if (error) {
                return res.send ({error})
            }
            res.send({
                address:    req.query.address,
                location: location,
                forecast: forecastData
            })
        } )
    } )
} )

app.get( '/products', (req, res) => {
    if ( !req.query.search ) {
        return res.send( {
            error: 'You must provide a search term.'
        } )
    }
    console.log(req.query)
    res.send( {
        products: []
    } )
} )

app.get( '*', (req,res) => {
    res.render( '404', {
        title: '404 Error',
        errorMessage : 'Page not found'
    } )    
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})