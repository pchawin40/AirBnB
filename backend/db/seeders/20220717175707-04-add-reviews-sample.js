'use strict';

const { Review, User, Spot } = require('../models');

const reviews = [
  {
    review: "You could waste your whole vacation time trying to figure out all the technical and wifi problems at the cabin.",
    stars: 5
  },
  {
    review: "Beautiful, simple, and thoughtfully designed cabin surrounded by stunning nature.",
    stars: 4
  },
  {
    review: "Peaceful, stylish, excellent record collection, perfect view! My husband and I booked this cabin for our anniversary and it was perfect. We plan to go back with friends this winter.",
    stars: 4
  },
  {
    review: "Wonderful place to get away from the city! The cabin is peaceful and cozy. Felt relaxing to work during the day from the deck, hearing the river, and the hot tub was great",
    stars: 5
  },
  {
    review: "I know this cabin is more geared to the winter season but we went in July and it is just as fun as summer getaway.",
    stars: 5
  },
  {
    review: "Indiana Jones ride is the most thrilling with favourites like It's a Small World and Astro Orbitors drawing big lines.",
    stars: 5,
    userId: 2,
    spotId: 3
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

        // userId
        const user = await User.findByPk(1);

        // spotId
        const spot = await Spot.findByPk(1);

        await user.createReview({
          review,
          stars,
          userId: userId ? userId : user.id,
          spotId: spotId ? spotId : spot.id
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
