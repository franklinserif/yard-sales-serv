/**
 * This module set the configuration sequelize need
 * @module libs/sequelize
 * @requires sequelize
 * @requires module:config/config
 * @requires  module:models/index
 */
const { Sequelize } = require('sequelize');
const config = require('../config/config');
const setupModels = require('../db/models/index');

/**
 * It will define all options
 * for initialize sequelize
 * @type {Object}
 */
const options = {
  dialect: 'postgres',
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnathorized: false,
    },
  };
  options.loggin = console.log;
}

/**
 * It will establish the connection with the database
 * @type {Object}
 * @memberof libs/sequelize
 * @constant
 */
const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
