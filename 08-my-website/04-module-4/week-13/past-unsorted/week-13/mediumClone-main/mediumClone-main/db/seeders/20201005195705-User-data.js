'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.com',
        hashedPassword: bcrypt.hashSync('1234567890')
      },
      {
        firstName: 'Ali',
        lastName: 'Kim',
        email: 'alicia.mira.kim@gmail.com',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Warren',
        lastName: 'Tamagri',
        email: 'wartam@memail.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Clayton',
        lastName: 'Reinhardt',
        email: 'clayrein@hemail.com',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Cindy',
        lastName: 'Spence',
        email: 'cinspen@lemail.com',
        hashedPassword: bcrypt.hashSync('password4')
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
