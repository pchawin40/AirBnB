'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
    firstName: DataTypes.STRING(255),
    lastName: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
