'use strict';
const data = require('../data/db.json');

const depositEmployers = data.depositEmployers.map(deposit => {
  deposit.createdAt = deposit.updatedAt = new Date();
  return deposit;
})
const depositUsers = data.depositUsers.map(deposit => {
  deposit.createdAt = deposit.updatedAt = new Date();
  return deposit;
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DepositUsers', depositUsers, {})
    await queryInterface.bulkInsert('DepositEmployers', depositEmployers, {})

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DepositUsers', null, {});
    await queryInterface.bulkDelete('DepositEmployers', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
