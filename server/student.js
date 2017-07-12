'use strict'
const router = require('express').Router();
//const db = require('../db');
const {Student} = require('../db/models/');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!

router.get('/', (req, res, next) => {
  Student.findAll()
    .then(results => res.send(results))
  .catch(next);
});

router.post('/', (req, res, next) => {
  const post = {};
  Student.post(post)
    .then(results => res.send(results))
    .catch(next);
});

router.put('/', (req, res, next) => {
  Student.update({
      where: {}
    })
    .then(results => res.send(results))
    .catch(next);
});

router.delete('/', (req, res, next) => {
  Student.destroy({
      where: {}
    })
    .then(results => res.send(results))
    .catch(next);
});

module.exports = router;
