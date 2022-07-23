'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Migration to add previewImage to 'Spots' table
     */
    await queryInterface.addColumn('Spots', 'previewImage', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Migration to remove previewImage from 'Spots' table
     */
    await queryInterface.removeColumn('Spots', 'previewImage');
  }
};
