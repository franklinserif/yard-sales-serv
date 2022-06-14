const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

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
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.HasOne(models.Customer, {
      as: 'customer,',
      foreignKey: 'userId',
    });
  }

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
