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
      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        }
      });

      // Spot belongs to Booking (* to 1)
      Spot.hasMany(models.Booking, {
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
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      validate: {
        isNumeric: {
          args: true,
          msg: "Price must be numeric"
        }
      }
    },
    avgStarRating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['avgStarRating']
      }
    },
    scopes: {
      details() {
        return {
          attributes: {}
        }
      },
      byReviews() {
        return {
          attributes: {
            exclude: ['description', 'avgStarRating', 'createdAt', 'updatedAt']
          }
        }
      }
    },
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};
