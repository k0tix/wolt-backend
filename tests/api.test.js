const supertest = require('supertest');
const { server } = require('../index');

const api = supertest(server)

describe('GET unknown endpoint', () => {
    it('404 is returned', async () => {
        await api
            .get('/api')
            .expect(404, {
                status: 404,
                url: '/api'
            })
    })
})

describe('GET /restaurants/search', () => {
    it('returns validation error if query not given', async () => {
        await api.get('/api/restaurants/search')
            .expect(400, {
                error: "Query string 'q' must be atleast 2 characters long"
            })
    })

    it('returns validation error if query is too short', async () => {
        await api.get('/api/restaurants/search?q=a')
            .expect(400, {
                error: "Query string 'q' must be atleast 2 characters long"
            })
    })

    it('returns a list of restaurants', async () => {
        await api.get('/api/restaurants/search?q=sushi')
            .expect(200)
            .then(response => {
                expect(response.body.restaurants.length).not.toBe(0)
            })
    })

    it('returns validation error if latitude is not numeric', async () => {
        await api.get('/api/restaurants/search?q=burger&lat=text&lon=24.1')
            .expect(400)
            .then(response => {
                expect(response.body.error).toBe('Latitude and longitude values must be numeric')
            })
    })

    it('returns validation error if longitude is not numeric', async () => {
        await api.get('/api/restaurants/search?q=burger&lat=60.2&lon=test')
            .expect(400)
            .then(response => {
                expect(response.body.error).toBe('Latitude and longitude values must be numeric')
            })
    })

    it('returns default distance in response', async () => {
        await api.get('/api/restaurants/search?q=burger&lat=60.2&lon=24.1')
            .expect(200)
            .then(response => {
                expect(response.body.distance).toStrictEqual({ value: 3, unit: 'km' })
            })
    })

    it('returns custom distance in response', async () => {
        await api.get('/api/restaurants/search?q=burger&lat=60.2&lon=24.1&distance=10')
            .expect(200)
            .then(response => {
                expect(response.body.distance).toStrictEqual({ value: 10, unit: 'km' })
            })
    })
})

server.close()