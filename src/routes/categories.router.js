/**
 * Express router providing categories related routes
 * @module routes/categories
 * @requires express
 * @requires passport
 * @requires module:services/category
 * @requires module:middlewares/validator
 * @requires module:middlewares/auth
 */

/**
 * express module
 * @constant
 */
const express = require('express');

/**
 * passport module
 * @constant
 */
const passport = require('passport');

/**
 * Category service class
 */
const CategoryService = require('../services/category.service');

/**
 * validate data
 * @function
 */
const validatorHandler = require('../middlewares/validator.handler');

/**
 * check user'roles
 * @function
 */
const { checkRoles } = require('../middlewares/auth.handler');

/**
 * data's schema validation
 * @type {object}
 */
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/category.schema');

/**
 * Express router to mount category related functions on.
 * @type {Object}
 * @constant
 * @namespace categoryRouter
 */
const router = express.Router();

/**
 * Services related to category
 * @type {Object}
 * @constant
 */
const service = new CategoryService();

/**
 * Route serving categories
 * @name get/Categories
 * @function
 * @memberof module:routes/categories
 * @param {string} path - Express path
 * @param {function} middleware - passport
 * @param {function} middleware - checkRoles
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving a category
 * @name get/id
 * @function
 * @memberof module:routes/categories
 * @param {string} path - Express path
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - CheckRoles
 * @param {Function} middleware - Validator
 */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route for creating a new category
 * @name post/category
 * @function
 * @memberof module:routes/categories
 * @param {string} path - Express middleware
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - CheckRoles
 * @param {Function} middleware - Validator
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newCategory = await service.create(data);
      res.json(newCategory);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route for update a category
 * @name patch/category
 * @function
 * @memberof module:routes/categories
 * @param {string} path - Express middleware
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - CheckRoles
 * @param {Function} middleware - Validator
 * @param {Function} middleware - Validator
 */
router.path(
  ':id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const categoryUpdated = await service.update(id, data);

      res.json(categoryUpdated);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route for delete a category
 * @name delete/category
 * @function
 * @memberof module:routes/categories
 * @param {string} path = Express middleware
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - checkRoles
 * @param {Function} middleware - validator
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);

      res.json(rta);
    } catch (error) {
      next(error);
    }
  },
);
module.exports = router;
