const { validationResult } = require('express-validator');
const createError = require('http-errors');
const { User } = require('../models');
const { generateAccessToken } = require('../helpers/generateTokens');

exports.register = async (req, res, next) => {
  if(req){
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    const error = createError(500, 'Validation Error');
    error.data = errors.array();
    return next(error);
  }
  const { username, password } = req.body;
  try {
    const createdUser = await User.register(username, password);

    return res.status(200).json({
      success: true,
      user: createdUser
    })
  } catch (err) {
    if(!err.statusCode) {
      err.statusCode = 500
    }
    return next(err)
  }
}
}

exports.login = async (req, res, next) => {
  if(req){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = createError(500, 'Validation Error');
      error.data = errors.array();
      return next(error);
    }

    const { username, password } = req.body;

    try {
      const loggedUser = await User.login(username, password);


      const token = generateAccessToken({ id: loggedUser.id, username: loggedUser.username });

      return res.status(200).json({
        success: true,
        id: loggedUser.id,
        username: loggedUser.username,
        token
      })
    } catch (err) {
      if(!err.statusCode){
        err.statusCode = 500
      }
      return next(err)
    }
    

  }
}