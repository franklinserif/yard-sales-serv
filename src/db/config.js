/**
 * this modile set the main config for sequelize
 * @module src/db/config.js
 */
const config = require('../config/config');

/**
 * Set main config for sequelize connect to database
 * depending that kind of enviroment it's running
 * DEV/PRODUCTION
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
