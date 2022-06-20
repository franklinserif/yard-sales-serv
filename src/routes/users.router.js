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
      const users = await service.find();

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
      const user = await service.findOne(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Router serving a create user
 * @name post/user
 * @function
 * @memberof routes/users
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {Function} middleware - check user role
 * @param {Function} middleware - validate data
 * @param {Function} middleware - Express middleware
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const user = await service.create(data);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving an update user
 * @name patch/user
 * @function
 * @memberof routes/user
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {Function} middleware - check user roles
 * @param {Function} middleware - validate user id
 * @param {Function} middleware - validate new user data
 * @param {Function} middleware - Express middleware
 */
router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const userUpdated = await service.update(id, data);

      res.status(201).json(userUpdated);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving delete user
 * @name delete/user
 * @function
 * @memberof routes/users
 * @param {string} path - Express path
 * @param {Function} middleware - passport
 * @param {Function} middleware - check user roles
 * @param {Function} middleware - validate data
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);

      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
