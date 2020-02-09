const http = require('http');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const restaurantRouter = require('./routes/restaurants');
const { restaurants } = require('./restaurants');

// Validate blurhashes on application start
const validateBlurHashes = require('./utils/validate_blurhash');
const invalidHashes = validateBlurHashes(restaurants);

invalidHashes.length > 0
    ? console.log(`Invalid blurhashes: ${validateBlurHashes(restaurants)}`)
    : console.log('No invalid blurhashes!');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/restaurants', restaurantRouter);

// Handle all other endpoints
app.use((req, res) => {
    res.status(404).send({ status: 404, url: req.url });
});

const server = http.createServer(app);

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

module.exports = {
    app, server,
};
