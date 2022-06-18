/**
 * This module contains all route for
 * Authentication
 * @module routes/auth
 * @requires express
 * @requires passport
 * @requires module:service/auth
 */

/**
 * express module
 * @constant
 */
const express = require('express');

/**
 * passport module
 * @constan
 */
const passport = require('passport');

/**
 * AuthService class
 * @constant
 */
const AuthService = require('../services/auth.service');

/**
 * Express router to mount auth related functions on.
 * @type {Object}
 * @constant
 * @namespace AuthRouter
 */
const router = express.Router();

/**
 * Servivces related to Auth functions
 * @type {Object}
 * @constant
 * @namespace AuthService
 */
const service = new AuthService();

/**
 * Route serving login
 * @name post/login
 * @function
 * @param {string} path - Express path
 * @param {Function} middleware - Passport middleware
 * @param {Function} middleware - Express middleware
 * @memberof module:routes/auth
 *
 */
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  },
);

/**
 * Route serving recovery, for recovery password
 * @name post/recovery
 * @function
 * @param {string} path - Express path
 * @param {Function} middleware - Express middleware
 * @memberof module:routes/auth
 */
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendMail(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
