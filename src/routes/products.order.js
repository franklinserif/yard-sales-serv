/**
 * Express router providing product related routes
 * @module routes/products
 * @requires express
 * @requires passport
 * @requires module:services/product
 * @requires module:middlewares/validator
 */

/**
 * express module
 * @constant
 */
const express = require('express');

/**
 * passport
 * @constant
 */
const passport = require('passport');

/**
 * Product service class
 */
const ProductService = require('../services/product.service');

/**
 * Validate data
 * @function
 */
const { validatorHandler } = require('../middlewares/validator.handler');

/**
 * Check user roles
 * @function
 */
const { checkRoles } = require('../middlewares/auth.handler');

/**
 * Product Schemas
 * @type {Object}
 * @constant
 */
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

/**
 * Express router to mount product related function on
 * @type {Object}
 * @constant
 * @namespace productRouter
 */
const router = express.Router();

/**
 * Services related to product
 * @type {Object}
 * @constant
 */
const service = new ProductService();

/**
 * Route serving product
 * @name get/products
 * @function
 * @memberof routes/products
 * @param {string} path - Express path
 * @param {Function} middleware - Express middleware
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();

    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * Route serving a product
 * @name get/product
 * @function
 * @memberof routes/products
 * @param {string} path - Express path
 * @param {Function} middleware - ValidatorHandler
 * @param {Function} middleware - Express middleware
 */
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving a create product route
 * @name post/product
 * @function
 * @memberof routes/products
 * @param {string} path - Express path
 * @param {Function} path - Passport middleware
 * @param {Function} middleware - check User admin
 * @param {Function} middleware - validate data
 * @param {Function} middleware - Express middleware
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = service.create(data);

      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route for update product
 * @name patch/product
 * @function
 * @memberof routes/products
 * @param {string} path - Express path
 * @param {Function} middleware - passport middleware
 * @param {Function} middleware - check user roles
 * @param {Function} middleware - validate product id
 * @param {Function} middleware - validate new product data
 * @param {Function} middleware - Express middleware
 */
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const productUpdated = service.update(id, data);

      res.status(201).json(productUpdated);
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route for delete product
 * @name delete/product
 * @function
 * @memberof routes/products
 * @param {string} path - Express path
 * @param {Function} middleware - passport middleware
 * @param {Function} middleware - check user role
 * @param {Function} middleware - validate data
 * @param {Function} middleware - Express middleware
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = service.delete(id);

      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
