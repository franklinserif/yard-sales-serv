/* eslint-disable camelcase */
/**
 * This module will define the schema validation
 * @module schemas/user
 */

const Joi = require('joi');

/**
 * id PrimaryKey in database
 * @type {Object}
 */
const id = Joi.number().integer();

/**
 * email of the user
 * @type {Object}
 */
const email = Joi.string().email();

/**
 * password of the user
 * @type {Object}
 */
const passowrd = Joi.string().min(8);

/**
 * role of the user
 * @type {Object}
 */
const role = Joi.string().min(5);

/**
 * Validate data for create user
 * @type {Object}
 */
const createUserSchema = Joi.object({
  email: email.require(),
  password: passowrd.require(),
  role: role.require(),
});

/**
 * Validate data for update user data
 * @type {Object}
 */
const updateUserSchema = Joi.object({
  email,
  role,
});

/**
 * Validate data for get user
 * @type {Object}
 */
const getUserSchema = Joi.object({
  id: id.require(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
