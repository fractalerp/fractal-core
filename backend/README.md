# BACKEND
A component based framework for NodeJs Applications

## 🧩 Architecture

The backend is created based on [Fractal Js](https://github.com/fractalerp/fractal-js). It also uses [Active Record Js](https://github.com/fractalerp/active-record-js) for defining models.

## ⚙️ How to run the project

1. Create the following environment variables in your node project.
```env
RDBMS_DATABASE_URI="mysql://DATBASE_USER:DATABASE_PASSWORD@DATABASE_HOST:DATABASE_PORT/DATABASE_DB"
NOSQL_DATABASE_URI="mongodb://DATABASE_HOST:DATABASE_PORT/DATABASE_DB"
NOSQL_DATABASE_ADAPTER="mongodb"
```

2. Then you can create your `nodejs` apps in the `components` folder. The projects in that folder are autoloaded at run time. See the sample `Task` project in the same folder. A proper documentation will be provided in the future. Also tools will be provided to create this structure. Refer to the github project management dashboard to see what is coming up.

## 👨‍💻 Development

To set up the development environment, run:

    > npm install

To automatically compile, bundle and push code changes to the running test project, run:

    > npm start

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm run test:unit

Run the unit test continuously during development:

    > npm run test:dev

## Scripts
While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Build the project and monitor source and config for changes and rebuild. Start the dev server|
|`watch`|Build the project and monitor source and config for changes and rebuild.|
|`prod:server:start`|starts the application in production as daemon and restart it in case of crashes|
|`prod:server:stop`|stop an instance of the application running|
|`emit`|Output javascript code|
|`test`|Runs lint, build, unit tests with mocha and generates a coverage report|
|`test:dev`|Runs mocha and watches for changes to re-run tests; does not generate coverage reports.|
|`test:unit`|Runs unit tests with mocha and generates a coverage report.|
|`build:release`|Build app optimized for production|
|`build:development`|Build app optimized for debugging.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.ts` files.|

