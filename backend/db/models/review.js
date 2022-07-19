'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Review belongs to Image (* to 1)
      Review.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'review'
        }
      });

      // Review belongs to Spot (* to 1)
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });

      // Review belongs to User (* to 1)
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    spotId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    review: DataTypes.STRING(255),
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
