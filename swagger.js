const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce',
    description: 'An API for managing e-commerce operations, including user registration, product management, cart handling, and order placement.'
  },
  host: 'localhost:8000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);