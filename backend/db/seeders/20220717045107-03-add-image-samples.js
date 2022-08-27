'use strict';

const { Image } = require('../models');

const images = [
  {
    url: "image url",
    imageableType: "Spot",
    imageableId: 1
  },
  {
    url: "image url 2",
    imageableType: "Spot",
    imageableId: 2
  },
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
