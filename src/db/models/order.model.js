/**
 * This module have all Order information
 * for sequelize generate the table, including
 * Table name, Schema, model and model relationships
 * @module models/order
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

/**
 * It represent the name of the database table
 * that sequelize will use to defined it
 * @constant
 * @type {Object}
 * @default
 */
const ORDER_TABLE = 'orders';

/**
 * It will define the Order Schema
 * that sequelize will use to define the
 * database table
 * @type {Object}
 */
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
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

  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items && this.items.length > 0) {
        return this.items.reduce(
          (total, item) => total + item.price * item.OrderProduct.amount,
        );
      }
      return 0;
    },
  },
};

/**
 * Order Model for sequelize Order
 * Database Table
 */
class Order extends Model {
  /**
   * It will make the sql relatioship between
   * Order table - Customer table / Order - Product
   * One Order belongs to one Customer / Many Orders belongs
   * to many Product
   * @param {Object} Models
   * @return {void}
   */
  static associate(Models) {
    this.belongsTo(Models.customer, { as: 'customer' });
    this.belongsToMany(Models.Product, {
      as: 'items',
      through: Models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
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
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = {
  ORDER_TABLE,
  OrderSchema,
  Order,
};
