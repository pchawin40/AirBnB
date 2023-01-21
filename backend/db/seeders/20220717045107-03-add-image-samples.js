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
  },
  {
    url: "https://media.istockphoto.com/id/458997485/photo/mgm-grand-las-vegas.jpg?s=612x612&w=0&k=20&c=uAbuwnbVti7S6XBCE6XX0Yg6vhz5rVIxW9e98u9L1Hk=",
    imageableType: "Spot",
    imageableId: 4
  },
  {
    url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/fb/45/be/ka-slave-cage.jpg?w=1400&h=-1&s=1",
    imageableType: "Spot",
    imageableId: 4
  },
  {
    url: "https://insideretail.asia/wp-content/uploads/2020/09/MK-restaurant.jpg",
    imageableType: "Spot",
    imageableId: 5
  },
  {
    url: "http://4.bp.blogspot.com/-R1A_iId4Q-c/U1eB1aR3v7I/AAAAAAAAQKU/duF7gBSA1Qg/s1600/mk+restaurant+bangkapi+green+noodles+crispy+pork.jpg",
    imageableType: "Spot",
    imageableId: 5
  },
  {
    url: "https://img.wongnai.com/p/1920x0/2018/10/15/ef4c1f17fb68470f95a39eb0c74fbe64.jpg",
    imageableType: "Spot",
    imageableId: 5
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
