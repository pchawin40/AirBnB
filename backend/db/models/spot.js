'use strict';
const {
  Model, Sequelize
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
      // Spot belongs to Image
      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        }
      });

      // Spot belongs to Booking
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      });

      // Spot belongs to User
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });

      // Spot has many reviews
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
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: {
          args: true,
          msg: "Price must be numeric"
        }
      }
    },
    locationType: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    scopes: {
      details() {
        return {
          attributes: {}
        }
      },
      byReviews() {
        return {
          attributes: {
            exclude: ['previewImage', 'description', 'createdAt', 'updatedAt']
          }
        }
      },
      byBookings() {
        return {
          attributes: {
            exclude: ['description', 'createdAt', 'updatedAt']
          }
        }
      },
      hideImage() {
        return {
          attributes: {
            exclude: ['previewImage']
          }
        }
      }
    },
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};
