/**
 * This module have all Category information
 * for sequelize generate the table, including
 * Table name, Schema, model and model relationships
 * @module models/order-product
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

/**
 * It represent the name of the database table
 * that sequelize will use to defined it
 * @constant
 * @type {Object}
 * @default
 */
const ORDER_PRODUCT_TABLE = 'orders_products';

/**
 * It will define the OrderProduct Schema
 * that sequelize will use to define the
 * database table
 * @type {Object}
 */
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    // @ts-ignore
    defaultValue: Sequelize.NOW,
  },

  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

/**
 * Category Model for sequelize OrderProduct
 * Database Table
 */
class OrderProduct extends Model {
  /**
   * It will make all the relationship need it
   * @static
   */
  static associate() {
    //
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
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_PRODUCT_TABLE,
  OrderProductSchema,
  OrderProduct,
};
