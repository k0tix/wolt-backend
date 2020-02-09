const { isBlurhashValid } = require('blurhash');

const validateBlurHashes = (restaurants) => {
    const errors = [];

    restaurants.forEach((restaurant) => {
        if (restaurant.blurhash === undefined) {
            return;
        }

        const validation = isBlurhashValid(restaurant.blurhash);

        if (!validation.result) {
            errors.push(`Blurhash not valid for restaurant:\n${JSON.stringify(restaurant)}\nreason: ${validation.errorReason}\n`);
        }
    });

    return errors;
};

module.exports = validateBlurHashes;
