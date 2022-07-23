'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Migration to add imageableId to 'Images' table
     */
    await queryInterface.addColumn('Images', 'imageableId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Migration to remove imageableId from 'Images' table
     */
    await queryInterface.removeColumn('Images', 'imageableId');
  }
};
