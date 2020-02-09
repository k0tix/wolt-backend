const { distance } = require('../filters');

const location = (request, response, next) => {
    // Skip distance filtering if no coordinates are given
    if (request.query.lat === undefined || request.query.lon === undefined) {
        return next();
    }

    const lat1 = parseFloat(request.query.lat);
    const lon1 = parseFloat(request.query.lon);

    // Validate coordinates input
    if (isNaN(lat1) || isNaN(lon1)) {
        return response.status(400).send({ error: 'Latitude and longitude values must be numeric' });
    }

    // Allow other distance values, if empty or not numeric, will default to 3 km
    const maxDistanceInKm = parseFloat(request.query.distance) || 3;
    request.distance = { value: maxDistanceInKm, unit: 'km' };

    request.restaurants = request.restaurants
        .filter((restaurant) => distance(restaurant, lat1, lon1, maxDistanceInKm));
    next();
};

module.exports = location;