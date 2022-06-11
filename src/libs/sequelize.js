const { Sequelize } = require('sequelize');
const config = require('../config/config');

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

module.exports = sequelize;
