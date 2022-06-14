const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const categorySchema = {
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
    defaultValie: Sequelize.NOW,
  },
};

class Category extends Model {
  static associate(Models) {
    this.hasMany(Models.product, { as: 'products', foreignKey: 'categoryId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'category',
      timestamps: false,
    };
  }
}

module.exports = { CATEGORY_TABLE, categorySchema, Category };
