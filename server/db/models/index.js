const Student = require('./Student');
const Campus = require('./Campus');
const conn = require('../conn');

Student.belongsTo(Campus);
Campus.hasMany(Student, {
  onDelete: 'cascade',
  hooks: true
});


const sync = ()=> {
  return conn.sync({ force: true });
};

module.exports = {
  conn,
  sync,
  Student,
  Campus
};
