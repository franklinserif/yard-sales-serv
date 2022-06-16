/* eslint-disable no-shadow */
// @ts-nocheck
/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module src/services/order.service.js
 */

const boom = require('@hapi/boom');

const { model } = require('sequelize');

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class OrderService {
  /**
   * It will insert data in the database table
   * @async
   * @param {Object} data
   * @returns {void}
   */
  async create(data) {
    const order = await model.Order.create(data);

    return order;
  }

  /**
   * It will find and return all table data
   * @async
   * @returns {Promise<Array<Object>>}
   */
  async find() {
    const orders = await model.Order.findAll();

    return orders;
  }

  /**
   * It will search a Order by its primary key
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async findOne(id) {
    const order = await model.Order.findOne(id);

    if (!order) throw boom.notFound('Order not found');
    return order;
  }

  /**
   * It will update a Order information
   * @async
   * @param {number} id - PrimaryKey
   * @param {*} data - data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    const model = await this.findOne(id);

    const order = await model.update(data);
    return order;
  }

  /**
   * It will delete a row in the database table
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async delete(id) {
    const order = await this.findOne(id);

    await order.destroy();
    return {
      delete: true,
    };
  }
}

module.exports = OrderService;
