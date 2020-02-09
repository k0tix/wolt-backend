const restaurantRouter = require('express').Router();
const { bindRestaurants, contains, location } = require('../utils/middlewares');

restaurantRouter.get('/search',
    bindRestaurants,
    contains,
    location,
    (request, response) => {
        return response.status(200).send({ restaurants: request.restaurants, distance: request.distance });
    }
);

module.exports = restaurantRouter;