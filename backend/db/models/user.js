'use strict';
const {
  Model
} = require('sequelize');

// TODO: import bcrypt
const bcrypt = require('bcryptjs');

// TODO: import OP sequelize package
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // TODO: instance method that will return an object with 
    // TODO: only 'User' safe-to-send instance information
    toSafeObject() {
      // deconstruct id, username, and e-mail
      const { id, username, email } = this;
      // return deconstructed information
      return { id, username, email }
    };

    // TODO: instance method that return whether password matches user's instances
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    // TODO: static method in user.js model that return the User with the given id
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    };

    // TODO: static method that search for one User with specified credential
    // TODO: (either username or email)
    static async login({ credential, password }) {
      // get user that have matching credential in either username or email
      const getUser = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      // if user is found and password matches, return the current user information
      if (getUser && getUser.validatePassword(password))
        return await User.scope('currentUser').findByPk(getUser.id);
    };

    // TODO: static method that create users with given username, email, and password
    static async signup({ username, email, password }) {
      // hash password using bcryptjs package's hashSync method
      const hashedPassword = bcrypt.hashSync(password);

      // create user (with hashedPassword instead of password)
      const newUser = await User.create({
        username,
        email,
        hashedPassword
      });

      // return the newly created users using currentUser scope
      return await User.scope('currentUser').findByPk(newUser.id);
    };

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    };
  }
  User.init({
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isEmail: {
          args: false,
          msg: 'Username must not be an e-mail'
        }
      },
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: {
          args: true,
          msg: 'E-mail must be in an e-mail format'
        }
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY(60),
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    indexes: [
      {
        unique: true,
        fields: ['username', 'email']
      }
    ],
    // TODO: default query that should not return credentials
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      // TODO: custom scope that will exclude only hashedPassword field
      currentUser() {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      // TODO: custom scope that will include all fields
      loginUser() {
        attributes: { }
      }
    }
  });
  return User;
};
