/**
 * It will define initialize all models configurations
 * for sequelize
 * @module models/index
 * @requires module:models/user
 * @requires module:models/customer
 * @requires module:models/product
 * @requires module:models/order
 * @requires module:models/order-product
 */
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

/**
 * It will initialize all Models schemas and
 * configurations that sequelize need to create
 * databases tables and relationshipts
 * @param {Object} sequelize
 * @function
 * @returns {void}
 */
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.Models);
  Customer.associate(sequelize.Models);
  Category.associate(sequelize.Models);
  Product.associate(sequelize.Models);
  Order.associate(sequelize.Models);
}

module.exports = setupModels;
