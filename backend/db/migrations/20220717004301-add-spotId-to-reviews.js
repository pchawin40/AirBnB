'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Migration to add spotId to 'Reviews' table 
     */
    await queryInterface.addColumn('Reviews', 'spotId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Migration to remove spotId from 'Reviews' table
     */
    await queryInterface.removeColumn('Reviews', 'spotId');
  }
};
