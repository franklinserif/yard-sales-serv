const { DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, {
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  },
};
