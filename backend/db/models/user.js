'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // TODO: instance method that will return an object with 
    // TODO: only 'User' safe-to-send instance information
    toSafeObject() {
      // deconstruct id and e-mail
      const { id, email } = this;
      // return deconstructed information
      return { id, email }
    };

    // TODO: instance method that return whether password matches user's instances
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    // TODO: static method in user.js model that return the User with the given id
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    };

    // TODO: static method that return User by email
    static async getCurrentUserByEmail(email) {
      return await User.scope('loginUser').findOne({
        where: {
          email: email
        }
      });
    };

    // TODO: static method that search for one User with specified credential (email)
    static async login({ email, password }) {
      // import OP sequelize package
      const { Op } = require('sequelize');

      // get user that have matching credential in email
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            email
          }
        }
      });

      // if user is found and password matches, return the current user information
      if (user && user.validatePassword(password)) {
        const getLoginUser = await User.scope('loginUser').findByPk(user.id);
        return getLoginUser;
      }
    };

    // TODO: static method that create users with given email and password
    static async signup({ firstName, lastName, email, password }) {
      // hash password using bcryptjs package's hashSync method
      const hashedPassword = bcrypt.hashSync(password);

      // create user (with hashedPassword instead of password)
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
      });

      // return the newly created users using currentUser scope
      return await User.scope('loginUser').findByPk(newUser.id);
    };

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User has many Booking (1 to *)
      User.hasMany(models.Booking, {
        foreignKey: 'userId'
      });

      // User has many Review (1 to *)
      User.hasMany(models.Review, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 255],
        isEmail: {
          args: true,
          msg: 'E-mail must be in an e-mail format'
        }
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    // TODO: default query that should not return credentials
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      currentUser() {
        return {
          attributes: {
            exclude: ['hashedPassword', 'createdAt', 'updatedAt']
          }
        }
      },
      // TODO: custom scope that will include all fields
      loginUser() {
        return {
          attributes: {}
        }
      }
    }
  });
  return User;
};
