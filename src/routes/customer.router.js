/**
 * Express router providing customer related routes
 * @module routes/customer
 * @requires express
 * @requires passport
 * @requires module:service/customer
 * @requires module:middlewares/validator
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
 * @constant
 */
const passport = require('passport');

/**
 * Services related to Customers
 */
const CustomerService = require('../services/customer.service');

/**
 * validatorHandler function
 * @type {Function}
 * @function
 */
const validatorHandler = require('../middlewares/validator.handler');

/**
 * Check the users roles
 * @function
 */
const { checkRoles } = require('../middlewares/auth.handler');

/**
 * Customer Schemas
 * @type {Object}
 * @constant
 */
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customer.schema');

/**
 * Express router to mount customer related functions on.
 * @type {Object}
 * @constant
 * @namespace customerRouter
 */
const router = express.Router();

/**
 * Services related to customer
 * @type {Object}
 * @constant
 */
const service = new CustomerService();

/**
 * Route serving customers
 * @name get/customers
 * @function
 * @memberof module:routes/customer
 * @param {string} path - Express path
 * @param {Function} middleware - Express middleware
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  async (req, res, next) => {
    try {
      const customers = await service.find();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Router serving a customer
 * @name get/customer
 * @function
 * @memberof module:routes/customer
 * @param {string} path - Express module
 * @param {Function} middleware - validatorHandler
 * @param {Function} middleware - Express middleware
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Router serving a create new route
 * @name post/customer
 * @function
 * @memberof module:routes/customer
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {Function} middleware - validatorHandler
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newCustomer = await service.create(data);

      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Router serving a update customer
 * @name patch/customer
 * @function
 * @memberof module:routes/customer
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {Function} middleware - validatorHandler
 * @param {Function} middleware - ValidorHandler
 * @param {Function} middleware - Express middleware
 */
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const customerUpdated = await service.update(id, data);

      res.status(201).json(customerUpdated);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Router serving a delete customer
 * @name delete/customer
 * @function
 * @memberof module:routes/customer
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {Function} middleware - validatorHandler
 * @param {Function} middleware - Express middleware
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);

      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
