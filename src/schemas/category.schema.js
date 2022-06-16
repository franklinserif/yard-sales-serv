/**
 * This module will define the schema validation
 * @module schemas/category
 */

const Joi = require('joi');

/**
 * This id is the equvivalent to PrimaryKey
 * @type {Object}
 */
const id = Joi.number().integer();

/**
 * Name of the category
 * @type {Object}
 */
const name = Joi.string().min(3).max(15);

/**
 * @type {Object}
 */
const image = Joi.string().uri();

/**
 * It will validate the data for creating a new category
 * @type {Object}
 */
const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.require(),
});

/**
 * Update category data
 * @type {Object}
 */
const updateCategorySchema = Joi.object({
  name,
  image,
});

/**
 * Validate id - primarykey of category
 * @type {Object}
 */
const getCategorySchema = Joi.object({
  id: id.require(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};
