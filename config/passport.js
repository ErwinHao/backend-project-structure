const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('../models')
const { ACCESS_TOKEN_SECRET } = process.env
const createError = require('http-errors');

module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN_SECRET
  }
  passport.use(new JwtStrategy(options, async (payload, next) => {
    const fetchedUser = await User.findUserById(payload.id);
    if(!fetchedUser){
      const error = createError(404, 'User not found');
      return next(error, false);
    }
    return next(null, fetchedUser);
  }))
}