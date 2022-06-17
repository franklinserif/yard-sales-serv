/**
 * This module have all User information
 * for sequelize generate the table, including
 * Table name, Schema, model and model relationships
 * @module models/user
 */
const { Model, DataTypes, Sequelize } = require('sequelize');

/**
 * It represent the name of the database table
 * that sequelize will use to defined it
 * @constant
 * @type {Object}
 * @default
 */
const USER_TABLE = 'users';

/**
 * It will define the User Schema
 * that sequelize will use to define the
 * database table
 * @type {Object}
 */
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer',
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'create_at',
    // @ts-ignore
    defaultValue: Sequelize.NOW,
  },
};

/**
 * User Model for sequelize User
 * Database Table
 */
class User extends Model {
  /**
   * It will make the sql relatioship between
   * User and Customer, one User may have one Customer
   * @param {Object} Models
   * @static
   * @return {void}
   */
  static associate(Models) {
    this.hasOne(Models.Customer, {
      as: 'customer,',
      foreignKey: 'userId',
    });
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
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    };
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
};
