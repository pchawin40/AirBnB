'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Spot belongs to Image (* to 1)
      Spot.belongsTo(models.Image, {
        foreignKey: 'imageableId'
      });

      // Spot belongs to Booking (* to 1)
      Spot.belongsTo(models.Booking, {
        foreignKey: 'spotId'
      });

      // Spot belongs to User (* to 1)
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });

      // Spot has many reviews (1 to *)
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      });

    }
  }
  Spot.init({
    address: DataTypes.STRING(255),
    city: DataTypes.STRING(50),
    state: DataTypes.STRING(50),
    country: DataTypes.STRING(50),
    lat: DataTypes.DECIMAL(2, 7),
    lng: DataTypes.DECIMAL(2, 7),
    name: DataTypes.STRING(255),
    description: DataTypes.STRING(255),
    price: DataTypes.DECIMAL(2, 2),
    avgStarRating: DataTypes.DECIMAL(1, 1),
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
