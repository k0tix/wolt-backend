const { search } = require('../filters');

const contains = (request, response, next) => {
    const searchTerm = request.query.q;

    if (searchTerm === undefined || searchTerm.length < 2) {
        return response.status(400).send({ error: 'Query string \'q\' must be atleast 2 characters long' });
    }

    request.restaurants = request.restaurants
        .filter((restaurant) => search(restaurant, searchTerm));

    next();
};

module.exports = contains;