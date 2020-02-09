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

## Testing

Run `npm test` to run tests