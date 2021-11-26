'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Follows", [
      { followerId: 1, followingId: 2 },
      { followerId: 1, followingId: 3 },
      { followerId: 1, followingId: 4 },
      { followerId: 2, followingId: 3 },
      { followerId: 3, followingId: 3 },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Follows", null, {})
  }
};
