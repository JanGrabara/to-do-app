const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
  } = require('sequelize-test-helpers')
  
  const CategoryModel = require('../../../models/category')
  
  describe('models/Category', () => {
    const Model = CategoryModel(sequelize, dataTypes)
    const instance = new Model()
  
    checkModelName(Model)('Category')

    context('properties', () => {
      ;['name'].forEach(checkPropertyExists(instance))
    })
  })
  