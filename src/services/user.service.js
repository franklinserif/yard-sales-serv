/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/user
 */

const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class UserService {
  /**
   * It will insert data in the database table
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const hash = bcrypt.hash(data.user.password, 10);

    const newData = {
      ...data,
      password: hash,
    };

    const user = await models.User.create(newData);

    // @ts-ignore
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * It will find and return all table data
   * @async
   * @returns {Promise<Array<Object>>}
   */
  async find() {
    const users = await models.User.findAll({
      include: ['customer'],
    });

    return users;
  }

  /**
   * It will search a User by its primary key
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) throw boom.notFound();
    return user;
  }
  /**
   * It will search a User by its email address
   * @async
   * @param {string} email
   * @returns {Promise<Object>}
   */

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });

    if (!user) boom.notFound('User not found');
    return user;
  }

  /**
   * It will update a User information
   * @async
   * @param {number} id - PrimaryKey
   * @param {*} data - data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    const model = await this.findOne(id);

    const user = model.update(data);
    return user;
  }

  /**
   * It will delete a row in the database table
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async delete(id) {
    const user = await this.findOne(id);

    await user.destroy();

    return { delete: true };
  }
}

module.exports = UserService;
