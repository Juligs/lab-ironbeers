const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beersdata: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random_beers', (req, res) => {

  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('Beers from the database: ', responseFromAPI)
      res.render('random_beers', { beersrandom: responseFromAPI });

    })
    .catch(error => console.log(error));
})
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.listen(3000, () => console.log('🏃‍ on port 3000'));