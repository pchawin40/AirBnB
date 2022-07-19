'use strict';

// TODO: Import bcrypt
const bcrypt = require('bcryptjs');

const { User } = require('../models');

const users = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@gmail.com',
    hashedPassword: bcrypt.hashSync('secret password')
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@gmail.com',
    hashedPassword: bcrypt.hashSync('secret password 2')
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (let userInfo of users) {
      const {
        firstName,
        lastName,
        email,
        hashedPassword
      } = userInfo;

      await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
      });
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users');
  }
};
