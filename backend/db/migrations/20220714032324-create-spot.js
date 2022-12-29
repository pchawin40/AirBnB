'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Migration to create 'Spots' table
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL(10, 7)
      },
      lng: {
        type: Sequelize.DECIMAL(10, 7)
      },
      name: {
        type: Sequelize.STRING(50)
      },
      description: {
        type: Sequelize.STRING(255)
      },
      price: {
        type: Sequelize.DECIMAL
      },
      locationType: {
        type: Sequelize.STRING(15)
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  // Migration to drop 'Spots' table
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
