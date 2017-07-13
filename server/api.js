'use strict'
const api = require('express').Router();
//const db = require('../db');
const StudentRouter = require('./student');
const CampusRouter = require('./campus');
// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
api.use('/students', StudentRouter);
api.use('/campuses', CampusRouter);
api.use('*', (req, res, next) => {
  res.status(500)
  res.send('Error is as Follows:\n\n');
})
module.exports = api
