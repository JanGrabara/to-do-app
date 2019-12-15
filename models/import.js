'use strict';
module.exports = (sequelize, DataTypes) => {
  const Import = sequelize.define('Import', {
    jsonData: DataTypes.TEXT
  }, {});
  Import.associate = function(models) {
    // associations can be defined here
  };
  return Import;
};