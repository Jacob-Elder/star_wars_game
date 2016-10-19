'use strict';

var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, cb){
        var hash = bcrypt.hashSync(createdUser.password, 5);
        createdUser.password = hash;
        cb(null, createdUser);
      }
    
  }, 
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.stat);
        
      }
    }, 
      instanceMethods: {
        validPassword: function(password){
          return bcrypt.compareSync(password, this.password);
        },
        toJSON: function(){
          var jsonUserObject = this.get();
          delete jsonUserObject.password;
          return jsonUserObject;
        }
      }
  });
  return user;
};