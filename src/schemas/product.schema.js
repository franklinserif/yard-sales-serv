/* eslint-disable camelcase */
/**
 * This module will define the schema validation
 * @module schemas/product
 */

const Joi = require('joi');

/**
 * Is the primaryKey on database
 * @type {Object}
 */
const id = Joi.number().integer();

/**
 * Name of the product
 * @type {Object}
 */
const name = Joi.string().min(3).max(15);

/**
 * Price of the product
 * @type {Object}
 */
const price = Joi.number().integer().min(10);

/**
 * Is the primaryKey on database
 * @type {Object}
 */
const description = Joi.string().min(10);

/**
 * Image of the product
 * @type {Object}
 */
const image = Joi.string().uri();

/**
 * id of the category
 * @type {Object}
 */
const categoryId = Joi.number().integer();

/**
 * Minimun price for search product
 * @type {Object}
 */
const price_min = Joi.number().integer();

/**
 * Maximun price for search product
 * @type {Object}
 */
const price_max = Joi.number().integer();

/**
 * limit query for search products
 * @type {Object}
 */
const limit = Joi.number().integer();

/**
 * offset query for search products
 * @type {Object}
 */
const offset = Joi.number().integer();

/**
 * Validate the data for creating a product
 * @type {Object}
 */
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.require(),
  description: description.require(),
  image: image.require(),
  categoryId: categoryId.require(),
});

/**
 * Validate data for update product
 * @type {Object}
 */
const updateProductSchema = Joi.object({
  name,
  price,
  description,
  image,
  categoryId,
});

/**
 * validate id for get product
 * @type {Object}
 */
const getProductSchema = Joi.object({
  id: id.require(),
});

/**
 * data for query product list
 * @type {Object}
 */
const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.when('price_min', {
    is: Joi.exist(),
    then: price_max.require(),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
