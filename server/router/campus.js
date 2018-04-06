const router = require('express').Router();

const { Campus } = require('../db/models');

// router.param('id', (req, res, next, id) => {
//   Campus.findById(id)
//   .then( campus => {
//     if(!campus) console.error
//     req.requestedCampus = campus;
//     next();
//   })
//   .catch(next);
// });

router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.send(campuses))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
  .then( requestedCampus => res.send(requestedCampus))
  .catch(next);
});

module.exports = router;
