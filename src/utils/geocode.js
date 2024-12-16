const request = require('request')
const geocode = ( address, callback ) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiZHVjZHVhbiIsImEiOiJjbTRlenppa3QxMTVhMndvaGo2MHh4ZWp3In0.ZIuKu4i3YuodeFGAZhsYiQ'

    request( {url : url, json : true}, (error, {body}) => {
        if ( error ) {
            callback('Unable to connect to the location service!', undefined)
        } else if ( body.features.length < 1) {
            callback( 'Unable to find location! Try another search.', undefined )
        } else {
            callback( undefined, {
                longitude: body.features[0].properties.coordinates.longitude,
                latitude: body.features[0].properties.coordinates.latitude,
                location: body.features[0].properties.name_preferred
            })

        }
        } )
}

module.exports = geocode