const app = require('express')();
const path = require('path');
app.use(require('./middleware/bodyParser'));
app.use(require('./middleware/logging'));
app.use('/api', require('./api'));
app.use(require('./middleware/staticServing'));

var validFrontendRoutes = [
  '/',
  '/campuses',
  '/students',
  '/campuses/:id',
  '/students/:id',
  '/signup',
  '/log in'
];

var indexPath = path.join(__dirname, '..', 'public', 'index.html');
validFrontendRoutes.forEach(function(stateRoute) {
  app.get(stateRoute, function(req, res) {
    res.sendFile(indexPath);
  });
});

app.get('/', (req, res, next) => {
  res.send('hi');
});

app.use(require('./middleware/error'));


module.exports = app;
