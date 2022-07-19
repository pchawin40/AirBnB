'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Booking has many Spot (1 to *)
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });

      // Booking belongs to User (* to 1)
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      notOwner() {
        return {
          attributes: {
            exclude: [
              'id',
              'createdAt',
              'updatedAt',
              'userId'
            ]
          }
        };
      }
    }
  });
  return Booking;
};
