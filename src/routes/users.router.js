/**
 * Express router for users
 * @name routes/user
 * @requires express
 * @requires passport
 * @requires module:services/user
 * @requires module:schema/user
 * @requires module:middlewares/validator
 * @requires module:middlewares/auth
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
 * Services user
 */
const UserService = require('../services/user.service');

/**
 * User Schemas
 * @constant
 */
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

/**
 * Validate data
 * @function
 */
const validatorHandler = require('../middlewares/validator.handler');

/**
 * check user role
 * @function
 */
const { checkRoles } = require('../middlewares/auth.handler');
