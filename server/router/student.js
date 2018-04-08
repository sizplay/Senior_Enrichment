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

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => {
      Object.assign(student, req.body);
      return student.save();
    })
    .then(student => res.send(student))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => {
      student.destroy();
    })
    .then( ()=> res.sendStatus(204))
    .catch(next);
});

module.exports = router;
