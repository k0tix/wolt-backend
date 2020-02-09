![Node.js CI](https://github.com/k0tix/wolt-backend/workflows/Node.js%20CI/badge.svg)

# Wolt backend task

Pre-assignment for Backend Summer 2020 Engineering Internship

[Task description](https://github.com/woltapp/summer2020)

## Working demo
A working demo can be found [here](https://woltbackend.herokuapp.com) (running on a free heroku dyno so it might take some time to load on the first request)

## Running locally

Clone repo

```bash
git clone https://github.com/k0tix/wolt-backend.git
cd wolt-backend
```

Install requirements
```bash
npm install
```

Copy and rename .env.example to .env

You can change the distance calculation method used by changing the DISTANCE_CALCULATION environment variable to something else than "HAVERSINE"

And start the application with

```bash
npm start
```

or watch for code changes

```bash
npm run watch
```

And try to send requests to `/api/restaurants/search`

## Brief overview of features

The application currently has only one endpoint `/api/restaurants/search`

Endpoint takes query strings to filter restaurants:

* `q`:
    * must be atleast 2 characters long, otherwise it returns a validation error
    * matches restaurants that include the search term in their name, description or tags
* `lat` and `lon`
    * returns all restaurants if no coordinates are provided
    * checks that the values are numeric, otherwise returns a validation error
    * filters restaurants that are inside the distance radius (default distance is 3km and calculates distance with haversine formula by default)
* `distance`
    * defaults to 3 km if value is not provided or the value is not numeric
    * changes the distance radius

## Testing

Run `npm test` to run tests

## CI

The application uses Github Actions to run tests and then deploys it to heroku