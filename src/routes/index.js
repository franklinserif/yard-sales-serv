/**
 * This module contains the main setup
 * for all routes
 * @module routes/index
 */

/**
 * Main api router for serving all routes
 * @constant
 */
const express = require('express');

/**
 *
 */
const authRouter = require('./auth.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const productsRouter = require('./products.router');
const profileRouter = require('./profile.router');
/**
 * Setup all routes and add o the main app
 * @param {Object} app
 * @returns {void}
 */
function routeApi(app) {
  const router = express.Router();
  // Add all router here
  router.use('/auth', authRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/ordersRouter', ordersRouter);
  router.use('/products', productsRouter);
  router.use('/profile', profileRouter);
  app.use('/api/v1', router);
}

module.exports = routeApi;
