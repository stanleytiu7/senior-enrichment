const router = require('express').Router();
//const db = require('../db');
const {
  Student
} = require('../db/models/');

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
// I know this because we automatically send index.html for all requests that don't make sense in our backend.
// Ideally you would have something to handle this, so if you have time try that out!
// DONE -------
router.get('/', (req, res, next) => {
  Student.findAll()
    .then(results => res.json(results))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(results => {
      console.log('get one Student', results);
      res.json(results)})
    .catch(next);
});

// DONE  -------
router.post('/', (req, res, next) => {
  //Student.create({
  //firstName: req.body.firstName,
  //lastName: req.body.lastName,
  //email: req.body.email,
  //campusId: req.body.campusId
  //})
  Student.findOrCreate({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        campusId: req.body.campusId
      }
    })
    .then(results => {
      res.json(results[0])
    })
    //else res.json(results[0].fullname)
    //})
    .catch(next);
});

//Done ---------
router.put('/:id', (req, res, next) => {
  Student.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }
    )
    .then(results => {
      if (results[0]) res.json(results[0])
      else res.send('failed to update')
    })

  .catch(next);
});

// DONE --------
router.delete('/:id', (req, res, next) => {
  //find first so if it doesnt exist we can do something
  Student.findById(req.params.id)

  .then(student => {
    if (student) {
      return student.destroy()
        .then(() => {
          res.json(student)
        })
    } else {
      res.status(404).send('Not Found!!')
    }
  })

  .catch(next);
});
module.exports = router;
