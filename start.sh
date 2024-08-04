#!/bin/bash

# SET UP FRONTEND
echo "Setting up frontend..."
cd frontend
npm i
npm run build

# SET UP BACKEND
echo "⚙️ Setting up backend..."
cd ../backend

echo "👨‍💻 Boooting backend up..."
npm run build:release

# set up environment variables
echo JWT_SECRET="fractal-dev" >> dist/.env

# MASH UP FRONTEND AND BACKEND TO RUN AS ONE APP
cp -r ../frontend/dist/* ./public

# START THE APPLICATION :)
echo "👻 Starting application..."
npm run prod:server:stop
npm run prod:server:start

