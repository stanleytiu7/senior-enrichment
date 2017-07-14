const app = require('./app');
const port = 7357;

app.listen(port, (err) => {
  if (err) throw err;
  console.log('Jet Fuel can\'t melt Dank Memes _/( .^. )\\_, oh and the server started on \n\n', 'port:', port, '\n');
});
