/**
 * Express router providing order related routes
 * @module routes/order
 * @requires module:service/orders
 * @requires module:middlewares/validator
 * @requires express
 */

/**
 * Express module
 * @type {Object}
 * @constant
 */
const express = require('express');

/**
 * Passport module
 * @type {Object}
 * @constnat
 */
const passport = require('passport');

/**
 * Service related to order
 */
const OrderService = require('../services/order.service');

/**
 * ValidatorHandler Function
 * @function
 */
const validatorHandler = require('../middlewares/validator.handler');

/**
 * Order Schemas
 * @type {Object}
 */
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('../schemas/order.schema');

/**
 * Express router to mount order related functions on
 * @type {Object}
 * @constant
 * @namespace orderRouter
 */
const router = express.Router();

/**
 * Services related to order
 * @type {Object}
 * @constant
 */
const service = new OrderService();

/**
 * Route serving orders
 * @name get/orders
 * @function
 * @memberof routes/orders
 * @param {string} path - Express path
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - Express middleware
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const orders = await service.find();

      res.json(orders);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving an order
 * @name get/order
 * @function
 * @memberof routes/orders
 * @param {string} path - Expres path
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - ValidatorHandler
 * @param {Function} middleware - Express
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);

      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving a create order
 * @name post/orders
 * @function
 * @memberof routes/order
 * @param {string} path - Express path
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - ValidatorHandler
 * @param {Function} middleware - Express middleware
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newOrder = service.create(data);

      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving a update order
 * @name patch/orders
 * @function
 * @memberof routes/order
 * @param {string} path - Express path
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - ValidatorHandler for id
 * @param {Function} middleware - ValidatorHandler for update data
 * @param {Function} middleware - Express middleware
 */

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const orderUpdated = service.update(id, data);
      res.status(201).json(orderUpdated);
    } catch (error) {
      next(error);
    }
  },
);

module.export = router;
