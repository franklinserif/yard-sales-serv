require('dotenv').config();

module.exports = {
  serverPort: process.env.PORT,
  dbUrl: process.env.DB_URL,
};
