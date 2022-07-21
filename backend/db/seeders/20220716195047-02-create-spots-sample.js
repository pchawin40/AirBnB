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
    avgStarRating: 4.5
  },
  {
    address: 'P.O. Box 1303',
    city: 'Charlotte',
    state: 'North Carolina',
    country: 'United States of America',
    lat: 120.2310045,
    lng: -50.2341234,
    name: 'Internal Revenue Services',
    description: "World's most efficient tax administrators",
    price: 500
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
        price,
        avgStarRating
      } = spotInfo;

      // get ownerId
      const ownerId = spots.findIndex(spot => spot === spotInfo) + 1

      await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        avgStarRating
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
    await queryInterface.bulkDelete('Spots');
  }
};
