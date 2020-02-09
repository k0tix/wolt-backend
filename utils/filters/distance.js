/**
 * Calculates distance between two coordinates in kilometres using the haversine formula
 * @param {float} lat1
 * @param {float} lon1
 * @param {float} lat2
 * @param {float} lon2
 */
const haversine = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // kilometres
    const radianMultiplier = Math.PI / 180;
    const distanceLatitude = (lat2 - lat1) * radianMultiplier / 2;
    const distanceLongitude = (lon2 - lon1) * radianMultiplier / 2;

    const a = Math.sin(distanceLatitude) * Math.sin(distanceLatitude)
        + Math.cos(lat1 * radianMultiplier) * Math.cos(lat2 * radianMultiplier)
        * Math.sin(distanceLongitude) * Math.sin(distanceLongitude);

    const c = Math.asin(Math.sqrt(a)) * 2;
    return earthRadius * c; // distance in kilometres
};

/**
 * Calculates distance between two coordinates using cosine rules for triangle on sphere
 * @param {float} lat1
 * @param {float} lon1 
 * @param {float} lat2 
 * @param {float} lon2 
 */
const cosine = (lat1, lon1, lat2, lon2) => {
    return (Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * 6371) / 100;
};

const distanceFilter = (restaurant, lat1, lon1, distanceInKm) => {
    return process.env.DISTANCE_CALCULATION === 'HAVERSINE'
        ? haversine(lat1, lon1, restaurant.location[1], restaurant.location[0]) <= Math.abs(distanceInKm)
        : cosine(lat1, lon1, restaurant.location[1], restaurant.location[0]) <= Math.abs(distanceInKm);
};

module.exports = distanceFilter;
