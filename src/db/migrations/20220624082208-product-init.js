const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE } = require('../models/product.model');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_TABLE, {
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
    });
  },

  async down(queryInterface) {
    queryInterface.dropTable(PRODUCT_TABLE);
  },
};
