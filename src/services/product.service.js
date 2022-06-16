/* eslint-disable no-shadow */
// @ts-nocheck
/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module src/services/product.service.js
 */

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class ProductService {
  /**
   * It will insert data in the database table
   * @async
   * @param {Object} data
   * @returns {void}
   */
  async create(data) {
    const product = await models.Products.create(data);
    return product;
  }

  /**
   * It will find and return all table data
   * @async
   * @returns {Promise<Array<Object>>}
   */
  async find() {
    const products = await models.Products.findAll();
    return products;
  }

  /**
   * It will search a Product by its primary key
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async findOne(id) {
    const product = await models.Product.findOne(id);
    if (product) throw boom.notFound('Product not found');
    return product;
  }

  /**
   * It will update a Product data
   * @async
   * @param {number} id - PrimaryKey
   * @param {Object} date - data to update
   */
  async update(id, data) {
    const model = await this.findOne(id);
    const product = await model.update(data);
    return product;
  }

  /**
   * It will delete a row in the database table
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async delete(id) {
    const product = await this.findOne(id);

    await product.destroy();
    return { delete: true };
  }
}

module.exports = ProductService;
