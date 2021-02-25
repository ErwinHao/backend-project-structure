const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
const createError = require('http-errors');

exports.generateAccessToken = (payload) => {
  if(!payload){
    const error = createError(400, 'No payload supplied');
    throw error
  }
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: '5s'
  });

}