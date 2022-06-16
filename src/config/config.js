/**
 * It will read all .env variable and make
 * available for the entire project
 * @module  config/config
 */
require('dotenv').config();

/**
 * All .env variable
 * @type {Object}
 */
module.exports = {
  serverPort: process.env.PORT,
  dbUrl: process.env.DB_URL,
};
