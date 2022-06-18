/**
 * This module have all Customer information
 * for sequelize generate the table, including
 * Table name, Schema, model and model relationships
 * @module models/customer
 * @requires sequelize
 * @requires model:models/user
 */
const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

/**
 * It represent the name of the database table
 * that sequelize will use to defined it
 * @constant
 * @type {string}
 * @default
 */
const CUSTOMER_TABLE = 'customers';

/**
 * It will define the Customer Schema
 * that sequelize will use to define the
 * database table
 * @type {Object}
 */
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    // @ts-ignore
    defaultValue: Sequelize.NOW,
  },

  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

/**
 * This class will define all configuration, relationships
 * and schemas that sequelize need to create the database table
 */
class Customer extends Model {
  /**
   * It will make the sql relatioship between
   * category table and Customers table - Users table /
   * Customers - Orders. One Customer may have one User.
   * One Customer may have one Order
   * @param {Object} Models
   * @static
   * @returns {void}
   */
  static associate(Models) {
    this.belongsTo(Models.User, { as: 'user' });
    this.hasMany(Models.Order, { as: 'orders', foreignKey: 'customerId' });
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
      tableName: CUSTOMER_TABLE,
      modelName: 'customer',
      timestamps: false,
    };
  }
}

module.exports = {
  CUSTOMER_TABLE,
  CustomerSchema,
  Customer,
};
