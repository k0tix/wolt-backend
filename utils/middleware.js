const { restaurants } = require('../restaurants');

const { search, distance } = require('./filters');

const bindRestaurant = (request, response, next) => {
    request.restaurants = restaurants;
    next();
};

const contains = (request, response, next) => {
    const searchTerm = request.query.q;

    if (searchTerm === undefined || searchTerm.length < 2) {
        return response.status(200).send({ error: 'Query string \'q\' must be atleast 2 characters long' });
    }

    request.restaurants = request.restaurants
        .filter((restaurant) => search(restaurant, searchTerm));

    next();
};

const location = (request, response, next) => {
    const lat1 = request.query.lat;
    const lon1 = request.query.lon;

    if (lat1 === undefined || lon1 === undefined) {
        next();
    }

    request.restaurants = request.restaurants
        .filter((restaurant) => distance(restaurant, lat1, lon1, 3));

    next();
};

module.exports = { bindRestaurant, contains, location };
