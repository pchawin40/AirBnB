'use strict';

const { Image } = require('../models');

const images = [
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://images2.fanpop.com/images/photos/5900000/Randomness-random-5997130-1280-800.jpg",
    imageableType: "Spot",
    imageableId: 2
  },
  {
    url: "https://images2.fanpop.com/images/photos/5900000/Randomness-random-5997130-1280-800.jpg",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://images2.fanpop.com/images/photos/5900000/Randomness-random-5997130-1280-800.jpg",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://www.howtogeek.com/wp-content/uploads/2018/06/shutterstock_1006988770.png?height=200p&trim=2,2,2,2",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1600/900/75/dam/disneyland/attractions/disneyland/sleeping-beauty-castle-walkthrough/sleeping-beauty-castle-exterior-16x9.jpg",
    imageableType: "Spot",
    imageableId: 3
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
    for (let imageInfo of images) {
      const {
        url,
        imageableType,
        imageableId
      } = imageInfo;

      await Image.create({
        imageableType,
        imageableId,
        url
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
    await queryInterface.bulkDelete('Images');
  }
};
