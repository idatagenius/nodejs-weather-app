const request =  require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bef206213454b108be79ac862724b154&query=${longitude},${latitude}&units=f`
    
    request({url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.success === false) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. ' + 'It is currently ' + body.current.temperature + ' degrees. ' + 'It feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast