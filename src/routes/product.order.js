/**
 * Express router providing product related routes
 * @module routes/product
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
 * @memberof routes/product
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
