'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Migration to add 'spotId' to 'Bookings' table
     */
    await queryInterface.addColumn('Bookings', 'spotId', {
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
     * Migration to remove 'spotId' from 'Bookings' table
     */
    await queryInterface.removeColumn('Bookings', 'spotId');
  }
};
