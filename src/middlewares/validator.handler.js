/**
 * This module contains all middleware
 * that validate data
 * @module middlewares/validator
 * @requires boom
 */

const boom = require('@hapi/boom');

/**
 * It will validate if the data is correct
 * dependin of the schema
 * @param {Object} schema
 * @param {string} property
 * @returns {Function}
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

module.exports = validatorHandler;
