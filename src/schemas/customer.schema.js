/* eslint-disable camelcase */
/**
 * This module will define the schema validation
 * @module schemas/customer
 */

const Joi = require('joi');

/**
 * id PrimaryKey in database
 * @type {Object}
 */
const id = Joi.number().integer();

/**
 * name of the customer
 * @type {Object}
 */
const name = Joi.string().min(3).max(30);

/**
 * lastName of the customer
 * @type {Object}
 */
const lastName = Joi.string();

/**
 * phone number of the user
 * @type {Object}
 */
const phone = Joi.string();

/**
 * userId Id of the user table in database
 * @type {Object}
 */
const userId = Joi.number().integer();

/**
 * email of the user
 * @type {Object}
 */
const email = Joi.string().email();

/**
 * password of the customer
 * @type {Object}
 */
const password = Joi.string().min(8);

/**
 * Validata data for create a new customer
 * @type {Object}
 */
const createCustomerSchema = Joi.object({
  name: name.require(),
  lastName: lastName.require(),
  phone: phone.require(),
  userId: userId.require(),
  email: email.require(),
  password: password.require(),
});

/**
 * Validate data for update customer data
 * @type {Object}
 */
const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

/**
 * Validate id for get Customer
 * @type {Object}
 */
const getCustomerSchema = Joi.object({
  id: id.require(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
