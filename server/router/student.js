const router = require('express').Router();

const { Student, Campus } = require('../db/models');

router.param('id', (req, res, next, id) => {
  Student.findById(id)
    .then(student => {
      if (!student) console.error
      req.requestedStudent = student;
      next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Student.scope('populated').findAll()
    .then(students => res.send(students))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  //console.log(req.requestedStudent.reload()) what is reload?
  req.requestedStudent.reload(Student.options.scopes.populated())
    .then(requestedStudent => res.send(requestedStudent))
    .catch(next);
});

module.exports = router;
