'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Bookmarks", [
      { userId: 1, storyId: 2 },
      { userId: 1, storyId: 3 },
      { userId: 1, storyId: 4 },
      { userId: 2, storyId: 3 },
      { userId: 4, storyId: 3 },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookmarks", null, {})
  }
};
