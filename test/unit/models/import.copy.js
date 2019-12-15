const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists
  } = require('sequelize-test-helpers')
  
  const ImportModel = require('../../../models/import')
  
  describe('models/Import', () => {
    const Model = ImportModel(sequelize, dataTypes)
    const instance = new Model()
  
    checkModelName(Model)('Import')

    context('properties', () => {
      ;['jasonData'].forEach(checkPropertyExists(instance))
    })
  })
  