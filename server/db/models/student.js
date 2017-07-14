'use strict';
var Sequelize = require('sequelize');
var db = require('../')


module.exports = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  getterMethods: {
    fullName: function() {
      return this.firstName + ' ' + this.lastName
    }
  }
})
