const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, {
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
