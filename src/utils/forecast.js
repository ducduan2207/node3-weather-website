const request = require( 'request' )

const forecast = ( lat, long, callback ) => {
    const url = 'https://api.weatherstack.com/current?access_key=ca9c78ae87163af4af2c7a58efd4688d&query=' + lat + ',' + long;
    request( {url : url, json : true}, (error, {body}) => {
        if ( error ) {
            callback( 'Unable to connect to the weather service!', undefined )
        } else if (body.error ) {
            callback( 'Unable to find location!',undefined )
        } else {
            callback( undefined, body.current.weather_descriptions + ': It is currently ' + body.current.temperature + ' degrees out. But it feels like ' + body.current.feelslike + ' degrees out.')
        }
    })

}

module.exports = forecast