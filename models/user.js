'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');
const createError = require('http-errors');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Article);
    }

    static #encrypt =  password => bcrypt.hashSync(password, 12);

    static #compare = (password, hashedPass) => bcrypt.compareSync(password, hashedPass);

    static register = async (username, password) => {
      const hashedPassword = this.#encrypt(password);

      return await this.create({ username, password: hashedPassword });
    }

    static login = async (username, password) => {
      const fetchedUser = await this.findUserByUsername(username);
      if(!fetchedUser){
        const error = createError(404, 'User not found');
        throw error;
      }

      const comparePass = this.#compare(password, fetchedUser.password)
      if(!comparePass){
        const error = createError(400, 'Password doesn\'t match');
        throw error
      }
      return fetchedUser
    }
    
    static findUserById = async (id) => {
      if(!id){
        const error = createError(500, 'User ID not supplied');
        throw error
      }
      const fetchedUser = await this.findOne({ where: { id } });
      if(!fetchedUser){
        return false
      }
      return fetchedUser;
    } 

    static findUserByUsername = async (username) => {
      if(!username){
        const error = createError(500, 'Username not supplied');
        throw error
      }
      const fetchedUser = await this.findOne({ where: { username } });
      if(!fetchedUser){
        return false
      }
      return fetchedUser;
    } 
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};