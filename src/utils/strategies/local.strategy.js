/**
 * This module contains the Local strategy auth
 * @module utils/strategies/local
 */

const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const AuthService = require('../../services/auth.service');

const service = new AuthService();

const LocalStrategy = new Strategy(
  {
    // @ts-ignore
    usernameField: 'email',
    passwordField: 'password',
  },

  /**
   * It will verify if the user exist
   * and if exist compare the password to
   * very if it's correct
   * @param {string} email
   * @param {string} password
   * @param {Function} done
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line consistent-return
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);

      if (!user) {
        done(boom.unauthorized(), false);
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);

module.exports = LocalStrategy;
