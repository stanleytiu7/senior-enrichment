const router = require('express').Router();
//const db = require('../db');
const {
  Campus,
  Student
} = require('../db/models/');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!

//easy DONE----------
router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(results => res.json(results))
    .catch(next);
});

// easy DONE -------------
router.get('/:campusId', (req, res, next) => {
  Campus.findById(req.params.campusId)
    .then(results => {
      if (results) res.json(results)
      else res.status(404).send('Not Found')
    })
    .catch(next);
});

// WIPPPP
router.get('/:campusId/students', (req, res, next) => {
  Campus.findOne({
    where: {
      id: req.params.campusId
    }
  })
  .then(result => {
      Student.findall({
        where: {
          campus: result.id
        }
      })
    })
    .then(results => res.json(results))
  .catch(next)
});

// WIPPPPP
router.get('/:campusId/students/:id', (req, res, next) => {
  Campus.findById(req.params.campusId)
    .then(results => res.json(results))
    .catch(next);
});


// DONE --------------
router.post('/', (req, res, next) => {
  Campus.findOrCreate({
      where: {
        name: req.body.name,
        image: req.body.image
      }
    })
    .then(results => {
      if (results[1]) res.json(results[0])
      else res.send(results[0].name + ' already exists!')
    })
    .catch(next);
});

// DONE ----
router.put('/:id', (req, res, next) => {
  Campus.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }
    )
    .then(results => {
      if (results[0]) res.json('updated')
      else res.send('failed to update')
    })

  .catch(next);
});


// DONE ------------
router.delete('/:id', (req, res, next) => {
  //find first so if it doesnt exist we can do something
  Campus.findOne({
    where: {
      id: req.params.id
    }
  })

  .then(campus => {
    if (campus) {
      return campus.destroy()
        .then(() => {
          res.send('destroyed entry with id: ' + campus.id)
        })
    } else {
      res.status(404).send('Not Found!!')
    }
  })

  .catch(next);
});

module.exports = router;
