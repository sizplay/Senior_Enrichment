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


router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.send(campus))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => {
      Object.assign(campus, req.body);
      return campus.save();
    })
    .then(campus => res.send(campus))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => {
      campus.destroy();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});


module.exports = router;
