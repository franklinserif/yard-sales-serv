/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/auth
 */

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UserService = require('./user.service');

const service = new UserService();

/**
 * This class will define all methods for  manage
 * Authentication
 */
class AuthService {
  /**
   * It will verify if the user exist and if
   * the password is the same
   * @async
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) throw boom.unauthorized();

    const isMath = bcrypt.compare(password, user.password);

    if (!isMath) throw boom.unauthorized();
    // @ts-ignore
    const { password: ps, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * It will sign a token
   * @param {Object} user
   * @returns {Object}
   */
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  /**
   * It will send an email
   * @async
   * @param {string} email
   * @returns {Promise<Object>}
   */
  async sendMail(email) {
    const user = await service.findByEmail(email);

    if (!user) throw boom.unauthorized();

    const transporte = nodemailer.createTransport({
      host: config.emailHost,
      secure: true,
      port: 465,
      auth: {
        user: config.emailSender,
        pass: config.emailPassword,
      },
    });

    await transporte.sendMail({
      from: config.emailSender,
      to: `${user.email}`,
      subject: 'Recovery password',
      text: 'Hola',
      html: '<p>Hola</p>',
    });

    return { message: 'mail send' };
  }
}

module.exports = AuthService;
