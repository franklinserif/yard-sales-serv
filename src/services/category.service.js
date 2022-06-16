/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module src/services/category.service.js
 */
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class CategoryService {
  /**
   * It will insert data in the database table
   * @async
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  /**
   * It will find and return all table data
   * @async
   * @returns {Promise<Array<Object>>}
   */
  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  /**
   * It will search a Category by its primary key
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async findOne(id) {
    const Category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!Category) throw boom.notFound('Category not found');

    return Category;
  }

  /**
   * It will update a Category information
   * @async
   * @param {number} id - PrimaryKey
   * @param {*} data - data to update
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    const model = await this.findOne(id);
    // @ts-ignore
    const category = await model.update(data);
    return category;
  }

  /**
   * It will delete a row in the database table
   * @async
   * @param {number} id - PrimaryKey
   * @returns {Promise<Object>}
   */
  async delete(id) {
    const category = await this.findOne(id);

    await category.destroy();
    return { delete: true };
  }
}

module.exports = CategoryService;
