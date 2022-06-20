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

/**
 * Express router to mount user functions on
 * @type {Object}
 * @constant
 * @namesapace userRouter
 */
const router = express.Router();

/**
 * User services
 * @type {Object}
 * @constant
 */
const service = new UserService();

/**
 * Route serving user
 * @name get/users
 * @function
 * @memberof routes/users
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {Function} middleware - check user Roles
 * @param {Function} middleware - Express middleware
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const users = service.find();

      res.json(users);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving an user
 * @name get/user
 * @function
 * @memberof routes/user
 * @param {string} path - Express path
 * @param {}
 */
router.get(
  '/:id',
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
