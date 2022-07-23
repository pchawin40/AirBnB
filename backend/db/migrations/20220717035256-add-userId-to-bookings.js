'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Migration to add userId to 'Bookings'
     */
    await queryInterface.addColumn('Bookings', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Migration to remove userId to 'Bookings'
     */
    await queryInterface.removeColumn('Bookings', 'userId');
  }
};
