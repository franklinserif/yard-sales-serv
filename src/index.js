/**
 * @file Main file of the project index.js
 * @author Franklin Rodriguez
 */

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/config');

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
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('working');
});

app.listen(config.serverPort, () => {});
