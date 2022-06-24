const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(USER_TABLE, {
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
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(USER_TABLE);
  },
};
