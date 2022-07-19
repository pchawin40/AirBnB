'use strict';

const { Review, User, Spot } = require('../models');

const reviews = [
  {
    review: "This was an awesome spot!",
    stars: 5
  },
  {
    review: "Review 2",
    stars: 4
  },
  {
    review: "Review 3",
    stars: 4
  },
  {
    review: "Review 4",
    stars: 5
  },
  {
    review: "Review 5",
    stars: 5
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
    for (let reviewInfo of reviews) {
      const {
        review,
        stars
      } = reviewInfo;

      // userId
      const user = await User.findByPk(1);

      // spotId
      const spot = await Spot.findByPk(1);

      await Review.create({
        review,
        stars,
        userId: user.id,
        spotId: spot.id
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
    await queryInterface.bulkDelete('Reviews');
  }
};
