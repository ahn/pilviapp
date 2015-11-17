"use strict";

var scrypt = require('scrypt');



module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      identifier: true,
      unique: true
    },
    realname: DataTypes.STRING,
    password_hash: DataTypes.BLOB,
    password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
        var hash = scrypt.kdfSync(val, scrypt.paramsSync(0.1));
        this.setDataValue('password_hash', hash);
        
      }
    }
  },
  {
    instanceMethods: {
      /*
      toJSON: function() {
        var u = this.get();
        return {
          username: u.username,
          realname: u.realname
        };
      },
      */
      verifyPassword(password, callback) {
        var hash = this.get().password_hash;
        scrypt.verifyKdf(hash, password, callback);
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Message)
      }
    }
  });

  return User;
};