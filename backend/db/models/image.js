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
      Image.belongsTo(models.Spot,
        {
          foreignKey: 'imageableId',
          constraints: false,
        }
      );

      // Image has many Reviews (1 - *)
      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false
      });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Image;
};
