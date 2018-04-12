const conn = require('../conn');
const Sequelize = require('sequelize');

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
