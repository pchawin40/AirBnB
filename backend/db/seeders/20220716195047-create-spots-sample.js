'use strict';

// Import Spot
const { Spot, User } = require('../models');

// Spots sample
const spots = [
  {
    address: '123 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.7645358,
    lng: -122.4730327,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 123,
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
    for (let spotInfo of spots) {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      } = spotInfo;

      const user = await User.findByPk(1);

      await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        ownerId: user.id
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
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
