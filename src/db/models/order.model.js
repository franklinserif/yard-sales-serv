const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const orderSchema = {
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

class Order extends Model {
  static associate(Models) {
    this.belongsTo(Models.customer, { as: 'customer' });
    this.belongsToMany(Models.Product, {
      as: 'items',
      through: Models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

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
  orderSchema,
  Order,
};
