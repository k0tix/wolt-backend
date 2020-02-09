const restaurantRouter = require('express').Router();
const { bindRestaurant, contains, location } = require('../utils/middleware');

restaurantRouter.get('/search',
    bindRestaurant,
    contains,
    location,
    (request, response) => {
        return response.status(200).send({ restaurants: request.restaurants, distance: request.distance });
    }
);

module.exports = restaurantRouter;