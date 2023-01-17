'use strict';

// TODO: Import bcrypt
const bcrypt = require('bcryptjs');

const { User } = require('../models');

const users = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@gmail.com',
    profilePicture: `https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}?set=set4`,
    hashedPassword: bcrypt.hashSync('secret password')
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@gmail.com',
    profilePicture: `https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}?set=set4`,
    hashedPassword: bcrypt.hashSync('secret password 2')
  },
  {
    firstName: 'Janet',
    lastName: 'Jones',
    email: 'janet.jones@gmail.com',
    profilePicture: `https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}?set=set4`,
    hashedPassword: bcrypt.hashSync('secret password 3')
  },
  {
    firstName: 'Craig',
    lastName: 'Orozco',
    email: 'craig.orozco@gmail.com',
    profilePicture: `https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}?set=set4`,
    hashedPassword: bcrypt.hashSync('secret password 4')
  },
  {
    firstName: 'Lea',
    lastName: 'Riggs',
    email: 'lea.riggs@gmail.com',
    profilePicture: `https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}?set=set4`,
    hashedPassword: bcrypt.hashSync('secret password 5')
  },
  {
    firstName: 'Moshe',
    lastName: 'Potts',
    email: 'moshe.potts@gmail.com',
    profilePicture: `https://robohash.org/${(Math.random() + 1).toString(36).substring(7)}?set=set4`,
    hashedPassword: bcrypt.hashSync('secret password 6')
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
        hashedPassword,
        profilePicture
      } = userInfo;

      await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
        profilePicture
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
