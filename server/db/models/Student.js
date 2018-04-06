const conn = require('../conn');
const Sequelize = require('sequelize');
const Campus = require('./Campus');

const Student = conn.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  }
}, {
    getterMethods: {
      fullName: function () {
        return this.firstName + ' ' + this.lastName;
      }
    },
    scopes: {
      populated: () => ({
        include: [{
          model: Campus,
          attributes: { exclude: 'description' }
        }]
      })
    }
  });

module.exports = Student;
