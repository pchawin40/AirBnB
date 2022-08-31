'use strict';

// Import Spot
const { Spot } = require('../models');

// Spots sample
const spots = [
  {
    address: '123 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.7645358,
    lng: 37.7645358,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 123,
    previewImage: "https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg"
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
    price: 500,
    previewImage: "https://federalnewsnetwork.com/wp-content/uploads/2018/04/IRS_Online_Payment_Glitch_88663.jpg"
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
        previewImage
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
        previewImage
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
