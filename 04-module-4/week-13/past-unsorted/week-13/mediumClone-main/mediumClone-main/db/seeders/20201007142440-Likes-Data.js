'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Likes", [
      { userId: 1, storyId: 2 },
      { userId: 1, storyId: 3 },
      { userId: 1, storyId: 4 },
      { userId: 2, storyId: 3 },
      { userId: 2, storyId: 4 },
      { userId: 3, storyId: 2 },
      { userId: 4, storyId: 3 },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Likes")
  }
};
