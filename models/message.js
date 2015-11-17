"use strict";

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    text: DataTypes.STRING
  });

  return Message;
};