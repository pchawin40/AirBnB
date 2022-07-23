'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Migration to add imageableType to 'Images' table
     */
    await queryInterface.addColumn('Images', 'imageableType', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Migration to remove imageableType to 'Images' table
     */
    await queryInterface.removeColumn('Images', 'imageableType');
  }
};
