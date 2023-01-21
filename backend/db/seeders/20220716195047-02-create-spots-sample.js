'use strict';

// Import Spot
const { Spot } = require('../models');

// Spots sample
const spots = [
  {
    id: 1,
    ownerId: 1,
    address: '123 Disney Lane',
    city: 'San Francisco',
    state: 'California',
    country: 'United States of America',
    lat: 37.7645358,
    lng: 37.7645358,
    name: 'App Academy',
    description: 'Place where web developers are created',
    price: 123,
    locationType: 'Stays',
    previewImage: "https://rew-online.com/wp-content/uploads/2019/05/90-fifth-avenue-ny-ny.jpg",
  },
  {
    id: 2,
    ownerId: 2,
    address: 'P.O. Box 1303',
    city: 'Charlotte',
    state: 'North Carolina',
    country: 'United States of America',
    lat: 120.2310045,
    lng: -50.2341234,
    name: 'Internal Revenue Services',
    description: "World's most efficient tax administrators",
    price: 500,
    locationType: 'Stays',
    previewImage: "https://federalnewsnetwork.com/wp-content/uploads/2018/04/IRS_Online_Payment_Glitch_88663.jpg"
  },
  {
    id: 3,
    ownerId: 1,
    address: '1313 Disneyland Dr',
    city: 'Anaheim',
    state: 'California',
    country: 'United States of America',
    lat: 33.812511,
    lng: -117.918976,
    name: 'Disneyland Park',
    description: "First Theme Park opend by The Walt Disney Company",
    price: 76,
    locationType: 'Experiences',
    previewImage: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/disneyland/attractions/disneyland/sleeping-beauty-castle-walkthrough/sleeping-beauty-castle-exterior-16x9.jpg"
  },
  {
    id: 4,
    ownerId: 3,
    address: '3799 S Las Vegas Blvd',
    city: 'Las Vegas',
    state: 'Nevada',
    country: 'United States of America',
    lat: 36.102251,
    lng: -115.169968,
    name: 'MGM Grand',
    description: "Hotel and casino located on the Las Vegas Strip in Paradise",
    price: 40,
    locationType: 'Stays',
    previewImage: "https://media.istockphoto.com/id/458997485/photo/mgm-grand-las-vegas.jpg?s=612x612&w=0&k=20&c=uAbuwnbVti7S6XBCE6XX0Yg6vhz5rVIxW9e98u9L1Hk="
  },
  {
    id: 5,
    ownerId: 4,
    address: "Terminal 21 Shopping Mall Sukhumvit and Soi 21, 4th storey",
    city: "Bangkok",
    state: "Sukhumvit",
    country: "Thailand",
    lat: 13.7563,
    lng: 100.5018,
    name: 'MK Restaurant',
    description: "Deliciously good food with suki, noodles, roasted ducks, dim sum, single dishes and many more.",
    price: 20,
    locationType: 'Experiences',
    previewImage: 'https://insideretail.asia/wp-content/uploads/2020/09/MK-restaurant.jpg'
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
        id,
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
        locationType,
        previewImage
      } = spotInfo;

      // get ownerId
      // const ownerId = spots.findIndex(spot => spot === spotInfo) + 1

      await Spot.create({
        id,
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
        locationType,
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
