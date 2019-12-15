'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    done: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    endDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    categoryId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.Category);
  };
  return Task;
};