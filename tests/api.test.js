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
            .expect(200, {
                error: "Query string 'q' must be atleast 2 characters long"
            })
    })

    it('returns validation error if query is too short', async () => {
        await api.get('/api/restaurants/search?q=a')
            .expect(200, {
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
})

server.close()