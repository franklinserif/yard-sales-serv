/**
 * This module contains the Local strategy auth
 * @module utils/strategies/local
 */

const { Strategy } = require('passport-local');

const AuthService = require('../../services/auth.service');

const service = new AuthService();

const LocalStrategy = new Strategy(
  {
    // @ts-ignore
    usernameField: 'email',
    passwordField: 'password',
  },

  /**
   *
   * @param {string} email
   * @param {string} password
   * @param {Function} done
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line consistent-return
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);

module.exports = LocalStrategy;
