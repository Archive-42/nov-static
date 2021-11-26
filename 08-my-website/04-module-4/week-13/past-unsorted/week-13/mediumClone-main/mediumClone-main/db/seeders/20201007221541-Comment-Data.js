'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", [
      {
        body: "Wow so cool I love bears.",
        userId: 1,
        storyId: 1
      },
      {
        body: "Yeah, I agree, very cool bears.",
        userId: 2,
        storyId: 1
      },
      // {
      //   body: "Did you just comment on your own story?",
      //   userId: 3,
      //   storyId: 1
      // },
      {
        body: "Hm. Interesting perspective.",
        userId: 3,
        storyId: 3
      },
      {
        body: "I am so confused.",
        userId: 4,
        storyId: 3
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {})
  }
};
