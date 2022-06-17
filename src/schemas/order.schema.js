/* eslint-disable camelcase */
/**
 * This module will define the schema validation
 * @module schemas/order
 */

const Joi = require('joi');

/**
 * id PrimaryKey in database
 * @type {Object}
 */
const id = Joi.number().integer();

/**
 * customerId for realtionship
 * @type {Object}
 */
const customerId = Joi.number().integer();

/**
 * orderId PrimaryKey in tabase
 * @type {Object}
 */
const orderId = Joi.number().integer();

/**
 * productId PrimaryKey of the product
 * @type {Object}
 */
const productId = Joi.number().integer();

/**
 * amount of product
 * @type {Object}
 */
const amount = Joi.number().min(1);

/**
 * Validate data for get order
 * @type {Object}
 */
const getOrderSchema = Joi.object({
  id: id.require(),
});

/**
 * Validate data for create a new order
 * @type {Object}
 */
const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

/**
 * Validate data for add new item
 * @type {Object}
 */
const addItemSchema = Joi.object({
  orderId: orderId.require(),
  productId: productId.require(),
  amount: amount.require(),
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema };
