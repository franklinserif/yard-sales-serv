/**
 * Express router providing order related routes
 * @module routes/order
 * @requires module:service/order
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
 * Check user roles
 * @function
 */
const { checkRoles } = require('../middlewares/auth.handler');

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
