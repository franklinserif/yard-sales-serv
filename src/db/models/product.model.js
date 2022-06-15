/**
 * This module have all Product information
 * for sequelize generate the table, including
 * Table name, Schema, model and model relationships
 * @module src/db/migrations/product.model.js
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

/**
 * It represent the name of the database table
 * that sequelize will use to defined it
 * @constant
 * @type {Object}
 * @default
 */
const PRODUCT_TABLE = 'products';

/**
 * It will define the Product Schema
 * that sequelize will use to define the
 * database table
 * @type {Object}
 */
const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  price: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    // @ts-ignore
    defaultValue: Sequelize.NOW,
  },
};

/**
 * Product Model for sequelize Product
 * Database Table
 */
class Product extends Model {
  /**
   * It will make the sql relatioship between
   * Product and Category
   * @param {Object} Models
   * @return {void}
   */
  static associate(Models) {
    this.belongsTo(Models.category, { as: 'category' });
  }

  /**
   * It will return the main configuration for
   * setup the table in sequelize
   * @param {Object} sequelize
   * @returns {Object}
   */
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
