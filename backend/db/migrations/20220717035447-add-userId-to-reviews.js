'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Migration to add userId to 'Reviews' table
     */
    await queryInterface.addColumn('Reviews', 'userId', {
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
     * Migration to remove userId from 'Reviews' table
     */
    await queryInterface.removeColumn('Reviews', 'userId');
  }
};
