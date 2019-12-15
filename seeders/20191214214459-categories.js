'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: "Kategoria 1",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: "Kategoria 2",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
