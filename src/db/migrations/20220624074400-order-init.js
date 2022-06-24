const { DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('../models/order.model');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE, {
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE);
  },
};
