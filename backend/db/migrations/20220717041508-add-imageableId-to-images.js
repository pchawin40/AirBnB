'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Images', 'imageableId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots', //'Reviews',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Images', 'imageableId');
  }
};
