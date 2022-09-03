'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      // Image has many Spots
      Image.belongsTo(models.Spot,
        {
          foreignKey: 'imageableId',
          constraints: false,
        }
      );

      // Image has many Reviews
      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false
      });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false
    },
    imageableType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    url: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ['imageableType', 'createdAt', 'updatedAt']
      }
    }
  });
  return Image;
};
