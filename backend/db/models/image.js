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
      // Image has many Spots (1 - *)
      Image.hasMany(models.Spot,
        {
          foreignKey: 'imageableId'
        }
      );

      // Image has many Reviews (1 - *)
      Image.hasMany(models.Review, {
        foreignKey: 'imageableId'
      });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING(255)
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
