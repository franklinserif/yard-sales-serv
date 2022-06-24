/* eslint-disable import/extensions */
/**
 * @file Main file of the project index.js
 * @author Franklin Rodriguez
 */

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/config');

const routerApi = require('./routes');

const {
  boomErrorsHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();

/**
 * list of authorized domain - cors
 * @constant
 * @type {Array<string>}
 * @default
 */
const whiteList = ['http://localhost:8080'];

/**
 * This object is for allow domain request
 * it will include all whiteList domain
 * @type {Object}
 */
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No authorized'));
    }
  },
};

app.use(cors(options));

require('./utils/strategies');

app.use(passport.initialize());

/**
 * Initialize all routes
 */
routerApi(app);

/**
 * Error handle middlewares
 */
app.use(boomErrorsHandler);
app.use(ormErrorHandler);

app.listen(config.serverPort, () => {});
