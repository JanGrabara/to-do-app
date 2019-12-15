const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
  } = require('sequelize-test-helpers')
  
  const TaskModel = require('../../../models/task')
  
  describe('models/Task', () => {
    const Model = TaskModel(sequelize, dataTypes)
    const instance = new Model()
  
    checkModelName(Model)('Task')

    context('properties', () => {
      ;['name', 'done','endDate','createdAt','updatedAt'].forEach(checkPropertyExists(instance))
    })
  })
  