const conn = require('../conn');
const Sequelize = require('sequelize');
const Student = require('./Student');

const Campus = conn.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://'
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Campus;

/* , {
    scopes: {
      populated: () => ({
        include: [{
          model: Student
        }]
      })
    }
  }
  */
