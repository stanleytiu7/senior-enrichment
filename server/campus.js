'use strict'
const router = require('express').Router();
//const db = require('../db');
const {
  Campus,
  Student
} = require('../db/models/');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!

//easy
router.get('/', (req, res, next) => {
  Campus.findAll()
    .then(results => res.send(results))
    .catch(next);
});
// easy
router.get('/:campusId', (req, res, next) => {
  Campus.findOne({
      where: {
        id: req.params.campusId
      }
    })
    .then(results => res.send(results))
    .catch(next);
});

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
    .then(results => res.send(results))
    .catch(next)
});

router.get('/:campusId/students/:id', (req, res, next) => {
  Campus.findOne({
      where: {
        id: req.params.campusId
      }
    })
    .then(results => res.send(results))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const post = {};
  Campus.post(post)
    .then(results => res.send(results))
    .catch(next);
});

router.put('/', (req, res, next) => {
  Campus.update({
      where: {}
    })
    .then(results => res.send(results))
    .catch(next);
});

router.delete('/', (req, res, next) => {
  Campus.destroy({
      where: {}
    })
    .then(results => res.send(results))
    .catch(next);
});

module.exports = router;
