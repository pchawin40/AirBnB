'use strict';

const { Review, User, Spot } = require('../models');

const reviews = [
  {
    review: "You could waste your whole vacation time trying to figure out all the technical and wifi problems at the cabin.",
    stars: 5,
    userId: 2,
    spotId: 1
  },
  {
    review: "Beautiful, simple, and thoughtfully designed cabin surrounded by stunning nature.",
    stars: 4,
    userId: 3,
    spotId: 1
  },
  {
    review: "Peaceful, stylish, excellent record collection, perfect view! My husband and I booked this cabin for our anniversary and it was perfect. We plan to go back with friends this winter.",
    stars: 4,
    userId: 4,
    spotId: 1
  },
  {
    review: "Wonderful place to get away from the city! The cabin is peaceful and cozy. Felt relaxing to work during the day from the deck, hearing the river, and the hot tub was great",
    stars: 5,
    userId: 5,
    spotId: 1
  },
  {
    review: "I know this cabin is more geared to the winter season but we went in July and it is just as fun as summer getaway.",
    stars: 5,
    userId: 6,
    spotId: 1
  },
  {
    review: "Indiana Jones ride is the most thrilling with favourites like It's a Small World and Astro Orbitors drawing big lines.",
    stars: 5,
    userId: 2,
    spotId: 3
  },
  {
    review: "Won big here",
    stars: 5,
    userId: 4,
    spotId: 4
  },
  {
    review: "This is my favorite restaurants. It have many in Thailand or every country. Mk restaurants is a suki restaurants.",
    stars: 4,
    userId: 5,
    spotId: 5
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
    try {
      for (let reviewInfo of reviews) {
        const {
          review,
          stars,
          userId,
          spotId
        } = reviewInfo;

        // // userId
        const user = await User.findByPk(userId);

        // // spotId
        // const spot = await Spot.findByPk(1);

        // for all users, create review from given list of reviews
        await user.createReview({
          review,
          stars,
          userId,
          spotId
        });
      }
    } catch (e) {
      console.error("errors: ", e);
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
