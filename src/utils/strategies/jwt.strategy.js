/**
 * It contains all jwt strategry
 * @module utils/strategies/jwt
 */

const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secrectOrKey: config.jwtSecret,
};

/**
 * JWT strategy for use in the middleware
 * @memberof utils/strategies/jwt
 * @type {Object} JWT Strategy
 * @constant
 */
const JwtStrategry = new Strategy(options, (payload, done) =>
  done(null, payload),
);

module.exports = JwtStrategry;
