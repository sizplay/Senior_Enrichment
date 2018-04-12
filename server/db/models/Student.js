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
    type: Sequelize.DECIMAL(10,2),
    validate: {
      min: 0,
      max: 4,
      isDecimal: true
    }

  },
  photo: {
    type: Sequelize.STRING,
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
