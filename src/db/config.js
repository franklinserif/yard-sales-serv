/**
 * this module set the main config for sequelize
 * @module db/config
 * @requires module:config/config
 */
const config = require('../config/config');

/**
 * Set main config for sequelize connect to database
 * depending that kind of enviroment it's running
 * DEV/PRODUCTION
 * @type {Object}
 * @memberof db/config
 * @constant
 */
module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
