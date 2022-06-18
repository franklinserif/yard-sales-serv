/**
 * It will read all .env variable and make
 * available for the entire project
 * @module  config/config
 * @requires dotenv
 */
require('dotenv').config();

/**
 * All .env variable
 * @type {Object}
 * @constant
 * @memberof config/config
 * @property {string} env - enviroment default is DEV
 * @property {number} serverPort - server's port
 * @property {string} dbUrl - database's url connection
 * @property {string} apiKey - apiKey for validation
 * @property {string} jwtSecret - secret key for token sign
 * @property {string} emailSender - email for from field
 * @property {string} emailPassword - email password
 * @property {string} emailHost - host email
 */
module.exports = {
  env: process.env.ENV || 'DEV',
  serverPort: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  emailSender: process.env.EMAIL_SENDER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailHost: process.env.HOST,
};
