/**
 * It contains all the middleware for auth
 * @module middlewares/auth
 */

const boom = require('@hapi/boom');

const config = require('../config/config');

/**
 *  It will check if the apiKey is Valid
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 */
function checkApiKey(req, res, next) {
  const apiKey = req.headers.api;

  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

/**
 * It validate if the user role is Admin
 * and reject if it's not
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 */
function checkAdminRole(req, res, next) {
  const { user } = req;

  if (user.role === 'admin') {
    next();
  } else {
    next(boom.forbidden());
  }
}

/**
 * It validate if the user had the correct role
 * @param {Array<string>} roles
 * @returns {Function}
 */
function checkRoles(roles) {
  return (req, res, next) => {
    const { user } = req;

    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden());
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
