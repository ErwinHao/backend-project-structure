const { body } = require('express-validator');
const { User } = require('../models');
const createError = require('http-errors');

exports.loginValidator = [
  (body('username'))
  .not()
  .isEmpty()
  .withMessage('Username cannot be empty')
  .custom(async(value) => {
    const fetchedUser = await User.findUserByUsername(value);
    if(!fetchedUser){
      const error = createError(404, 'User not found');
      throw error
    }
  })
  .trim()
  .escape(),
  (body('password'))
  .not()
  .isEmpty()
  .withMessage('Password cannot be empty')
  .trim()
  .escape()
]

exports.registerValidator = [
  (body('username'))
  .not()
  .isEmpty()
  .withMessage('Username cannot be empty')
  .custom(async(value) => {
    const fetchedUser = await User.findUserByUsername(value);
    if(fetchedUser){
      const error = createError(400, 'User already exists');
      throw error
    }
  })
  .trim()
  .escape(),
  (body('password'))
  .not()
  .isEmpty()
  .withMessage('Password cannot be empty')
  .trim()
  .escape()
]