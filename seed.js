const toonAvatar = require('cartoon-avatar');
const chance = require('chance')(123);
const Promise = require('bluebird');
const coolimages = require('cool-images');

const { conn, Student, Campus } = require('./server/db/models');

const numStudents = 100;

const emails = chance.unique(chance.email, numStudents);

function gpa() {
  return (Math.random() * 4).toString().slice(0, 3);
}

function randPhoto(gender) {
  gender = gender.toLowerCase();
  const id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randStudent(createdCampus) {
  const gender = chance.gender();
  const campus = chance.pick(createdCampus);
  return Student.build({
    firstName: chance.first({ gender: gender }),
    lastName: chance.last(),
    photo: randPhoto(gender),
    email: emails.pop(),
    gpa: gpa()*1,
    campus_id: campus.id
  });
}

const manyCoolimages = coolimages.many();

function randCampus() {
  return Campus.build({
    name: chance.word(),
    imageUrl: manyCoolimages.pop(),
    description: chance.paragraph()
  });
}

function doTimes(n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function generatedCampus() {
  return doTimes(5, randCampus);
}

function generatedStudent(createdCampus) {
  return doTimes(numStudents, ()=> randStudent(createdCampus))
}

function createCampus() {
  return Promise.map(generatedCampus(), campus => campus.save());
}

function createStudent(createdCampus) {
  return Promise.map(generatedStudent(createdCampus), student => student.save());
}

function seed() {
  return createCampus()
  .then(createdCampus => createStudent(createdCampus));
}


console.log('Syncing database');

conn.sync({ force: true })
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    conn.close();
    return null;
  });

