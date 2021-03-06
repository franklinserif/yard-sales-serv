/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/order
 */

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class OrderService {
  /**
   * It will insert data in the database table
   * @async
   * @param {Object} data
   */
  async create(data) {
    const order = await models.Order.create(data);

    return order;
  }

  /**
   * It will find and return all table data
   * @async
   * @returns {Promise<Array<Object>>}
   */
  async find() {
    const orders = await models.Order.findAll();

    return orders;
  }

  /**
   * It will search a Order by its primary key
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async findOne(id) {
    const order = await models.Order.findByPk(id);

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
