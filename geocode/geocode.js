const request = require('request');
//numer name_of_st Street, city
// MapQuest API Key:
const mapQuest_key = `94ADxVIe8uiGCqghI2ss5537Px2DgYCH`;


module.exports.geoAddress = (_address, callback) => {
	let address = encodeURIComponent(_address);

	request(`http://open.mapquestapi.com/geocoding/v1/address?key=${mapQuest_key}&location=${address}`,
	(err, response, body) => {
		let m_body = JSON.parse(body);
		let lat = m_body.results[0].locations[0].latLng.lat;
		let lng = m_body.results[0].locations[0].latLng.lng;
		let street = m_body.results[0].locations[0].street;
		let zip = m_body.results[0].locations[0].postalCode;

	// console.log(err);
	console.log(`Latitude: ${lat} Longitude: ${lng}`);

	if(street === ''){
		callback(`Typed a wrong address, This is the stupid API, but free`);
	}else{
		callback(undefined, {
			lat,
			lng,
			street,
			zip
		});
	}
});
}
