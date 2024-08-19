#!/bin/bash

# SET UP BACKEND
echo "⚙️ Setting up app..."
echo "👨‍💻 Boooting backend up..."
npm run build

# set up environment variables
echo JWT_SECRET="fractal-dev" >> dist/.env
echo DATBASE_URI="mysql://" >> dist/.env

# START THE APPLICATION :)
echo "👻 Starting application..."
npm run prod:server:stop
npm run prod:server:start

