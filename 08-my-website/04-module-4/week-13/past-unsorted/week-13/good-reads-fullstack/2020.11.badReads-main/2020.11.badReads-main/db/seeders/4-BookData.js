"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Books", [
      {
        name: "Twilight",
        description:
          "Twilight is about a young girl getting gaslit into believing her life is worth throwing away for a shimmery vampire.",
        pageCount: 501,
        publisherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "New Moon",
        description: "the 2nd Twilight book",
        pageCount: 563,
        publisherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Eclipse",
        description: "the 3nd Twilight book",
        pageCount:62,
        publisherId:3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Breaking Dawn",
        description: "the 4th Twilight book",
        pageCount: 756,
        publisherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Midnight Sun",
        description: "the 5th Twilight book",
        pageCount: 662,
        publisherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fifty Shades of Grey",
        description: "the 1st Fifty Shades Book",
        pageCount: 356,
        publisherId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fifty Shades Darker",
        description: "the 2nd Fifty Shades Book",
        pageCount: 532,
        publisherId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fifty Shades Freed",
        description: "the 3rd Fifty Shades Book",
        pageCount: 579,
        publisherId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "The Great Gatsby",
        description: "This is a book. Read it or Don't",
        pageCount: 200,
        publisherId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Grendel",
        description: "The reversed roll book about Beowulf and Grendel...why?",
        pageCount:17,
        publisherId:7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "First Step 2 Forever",
        description: "Justin Bieber wrote a book it seems..ew",
        pageCount: 240,
        publisherId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "A Shore Thing",
        description: "Snooki wrote a book it seems..ew",
        pageCount: 289,
        publisherId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dark Side of Darkness",
        description: "Darkness has never seemed darker",
        pageCount: 250,
        publisherId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Journey to the Stars",
        description: "It's not about the journey, it's about the stars",
        pageCount: 1,
        publisherId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Think Outside The Thing",
        description: "Try it, it won't hurt",
        pageCount: 150,
        publisherId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "I did it for the stats: social media and coolness explained",
        description: "A mathmatical approach to being a cool person...nerd",
        pageCount: 314,
        publisherId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "These Trees Are Moody",
        description: "They need help",
        pageCount: 120,
        publisherId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "We're All Stardust: A Bedtime Story for Little Drunk Humans",
        description: "I know you are, but what am I?",
        pageCount: 42,
        publisherId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "The Life of a Crab Rangoon",
        description: "Delicious AND extra",
        pageCount: 800,
        publisherId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bad Eye Drops",
        description: "Do not use",
        pageCount: 132,
        publisherId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lights!",
        description: "A brief history of The Weeknd",
        pageCount: 1000,
        publisherId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Murdering Last Summer?",
        description: "the smash prequel to Who Stole My Lip, Balm",
        pageCount: 450,
        publisherId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Who Stole My Lip, Balm.",
        description: 'The smash prequel to "Murdering Last Summer" ',
        pageCount: 345,
        publisherId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Recursion, Loop, Duck Wine",
        description: "The explination of the prequels for MLS and WSMLB",
        pageCount: 345,
        publisherId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Books", null, {});
  },
};