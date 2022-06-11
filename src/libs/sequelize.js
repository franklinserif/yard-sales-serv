const { Sequelize } = require('sequelize');
const config = require('../config/config');
const setupModels = require('../db/models/index');

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
