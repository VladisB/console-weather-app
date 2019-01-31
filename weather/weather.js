const request = require('request');
// DarkSky API Key:
const darksky_key = `2d947bcea1e167093d98763de117f60e`;

//?units=si  - set up celsius
module.exports.getWeather = (lat, lng, callback) => {
	request(` https://api.darksky.net/forecast/${darksky_key}/${lat},${lng}/?units=si`, 
	(err, response, body) => {
		let m_body = JSON.parse(body);
		// console.log(m_body);

		if(m_body.code === 400){
			callback(m_body.error);
		}else{
			callback(undefined, {
				temperature: m_body.currently.temperature,
				apparentTemperature: m_body.currently.apparentTemperature
			})
		}
	});
}
