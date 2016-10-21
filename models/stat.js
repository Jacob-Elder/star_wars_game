'use strict';
module.exports = function(sequelize, DataTypes) {
  var stat = sequelize.define('stat', {
    userId: DataTypes.INTEGER,
    savename: DataTypes.STRING,
    location: DataTypes.STRING,
    credits: DataTypes.INTEGER,
    starships: DataTypes.TEXT,
    unfinishedplanets: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.stat.belongsTo(models.user);
      }
    }
  });
  return stat;
};