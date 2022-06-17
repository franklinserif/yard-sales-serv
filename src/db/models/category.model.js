/**
 * This module have all Category information
 * for sequelize generate the table, including
 * Table name, Schema, model and model relationships
 * @module models/category
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

/**
 * It represent the name of the database table
 * that sequelize will use to defined it
 * @constant
 * @type {string}
 * @default
 */
const CATEGORY_TABLE = 'categories';

/**
 * It will define the Category Schema
 * that sequelize will use to define the
 * database table
 * @type {Object}
 */
const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  name: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
  },

  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    // @ts-ignore
    defaultValie: Sequelize.NOW,
  },
};

/**
 * Category Model for sequelize Categories
 * Database Table
 */
class Category extends Model {
  /**
   * It will make the sql relatioship between
   * category table and Products table, one category may have
   * many products
   * @param {Object} Models
   * @static
   * @return {void}
   */
  static associate(Models) {
    this.hasMany(Models.product, { as: 'products', foreignKey: 'categoryId' });
  }

  /**
   * It will return the main configuration for
   * setup the table in sequelize
   * @param {Object} sequelize
   * @static
   * @returns {Object}
   */
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'category',
      timestamps: false,
    };
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
