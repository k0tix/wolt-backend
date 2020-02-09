const { restaurants } = require('../../restaurants');

const bindRestaurant = (request, response, next) => {
    request.restaurants = restaurants;
    next();
};

module.exports = bindRestaurant;