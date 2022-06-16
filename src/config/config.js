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
  env: process.env.ENV || 'DEV',
  serverPort: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  emailSender: process.env.EMAIL_SENDER,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailHost: process.env.HOST,
};
