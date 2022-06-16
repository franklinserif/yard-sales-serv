/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module src/services/customer.service.js
 */

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

/**
 * This class will define all methods for manipule
 * data in the database table
 */

class CustomerService {
  /**
   * It will insert data in the database table
   * @async
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const customer = await models.Customer.create(data);

    return customer;
  }

  /**
   * It will find and return all table data
   * @async
   * @returns {Promise<Array<Object>>}
   */
  async find(id) {
    const customers = await models.Customer.findAll(id);

    return customers;
  }

  /**
   * It will search a Customer by its primary key
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) throw boom.notFound('Customer not found');

    return customer;
  }

  /**
   * It will update a Customer information
   * @async
   * @param {number} id - PrimaryKey
   * @param {*} data - data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    const model = await this.findOne(id);

    const customer = await model.update(data);

    return customer;
  }

  /**
   * It will delete a row in the database table
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async delete(id) {
    const customer = await this.findOne(id);

    await customer.destroy();

    return { delete: true };
  }
}

module.exports = CustomerService;
