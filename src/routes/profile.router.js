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
const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema } = require('../schemas/user.schema');

/**
 * Order service
 */
const OrderService = require('../services/order.service');

/**
 * User Services
 */
const UserService = require('../services/user.service');

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
 * Router serving my-order
 * @name get/my-orders
 * @function
 * @memberof routes/profile
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {function} middleware - Express middleware
 */
router.get(
  '/cart',
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

/**
 * Router serving user profile
 * @name get/profile
 * @function
 * @memberof routes/profile
 * @param {string} path - Express path
 * @param {Function} middleware - Passport
 * @param {Function} middleware - Validate data
 * @param {Function} middlare - Express middleware
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = service.findOne(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
