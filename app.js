const yargs = require('yargs');
const argv = yargs.options({
	a: {
		demand: true,
		alias: 'address',
		describe: 'Address to fetch weather for',
		string: true
	}
}).help().alias('help', 'h').version().alias('version', 'v').argv;

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

geocode.geoAddress(argv.address, (err, results) => {
	if(err){
		console.log(err);
	}else{
		console.log(results);
		weather.getWeather(results.lat, results.lng, (err, weatherResults) => {
			if(err){
				console.log(err);
			}else{
				console.log(`Address ${results.street}. Zip: ${results.zip}`);
				console.log(`it is  ${weatherResults.temperature} degrees, but it feels like ${weatherResults.apparentTemperature}`);
			}
		})
	}
});

