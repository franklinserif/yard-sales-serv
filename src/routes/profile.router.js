/**
 * Express router for user's order
 * @module routes/profile
 * @requires express
 * @requires passport
 * @requires module:services/order
 */

/**
 * Express module
 * @constant
 */
const express = require('express');

/**
 * passport module
 * @constant
 */
const passport = require('passport');

/**
 * Order service
 */
const OrderService = require('../services/order.service');

/**
 * Express router to mount user's order function on
 * @type {Object}
 * @constant
 * @namespace myOrders
 */
const router = express.Router();

/**
 * Order services
 * @type {Object}
 * @constant
 */
const service = new OrderService();

/**
 * Router serving my-orders
 * @name get/my-orders
 * @function
 * @memberof routes/profile
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {function} middleware - Express middleware
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const myOrders = service.findByUser(user);

      res.json(myOrders);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
