// TODO: Import packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

// TODO: Variable to set if environment is in production or not
const { environment } = require('./config');
const isProduction = environment === 'production';

// TODO: Initialize Express app
const app = express();

// TODO: Connect 'morgan' middleware (log request/response)
app.use(morgan('dev'));

// TODO: Add 'cookie-parser' middleware (parse cookies)
// TODO: Add 'express.json' middleware (parse JSON bodies)
app.use(cookieParser());
app.use(express.json());

// TODO: Add middlewares
// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// TODO: Add routes to Express application
app.use(routes); // Connect all the routes

// TODO: Export app
module.exports = app;
