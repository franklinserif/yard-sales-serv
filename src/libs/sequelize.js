/**
 * This module set the configuration sequelize need
 * @module libs/sequelize
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

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
