/**
 * this is the main strategies module
 * @module utils/strategies/index
 */

const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategry = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategry);
