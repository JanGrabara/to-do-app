'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
      done: true,
      name: "Task1",
      endDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: 1
    },{
      done: true,
      name: "Task2",
      endDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: 1
    },{
      done: false,
      name: "Task3",
      endDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: 2
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Tasks', null, {});
  }
};
