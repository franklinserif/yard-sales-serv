/**
 * This module contains the main setup
 * for all routes
 * @module routes/index
 */

const express = require('express');

/**
 * Setup all routes and add o the main app
 * @param {Object} app
 * @returns {void}
 */
function routeApi(app) {
  const router = express.Router();
  // Add all router here
  app.use('/api/v1', router);
}

module.exports = routeApi;
