/**
 * errors handler middleware module
 * @module middlewares/error
 */

const { ValidationError } = require('sequelize');

/**
 * It will handler erros if it's a boom error
 * otherwise it will response with the error it self
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} _next
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function boomErrorsHandler(err, req, res, _next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
}

/**
 * It will handler all orm errors
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {void}
 */
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  } else {
    next(err);
  }
}

module.exports = { boomErrorsHandler, ormErrorHandler };
