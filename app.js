const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// //For partial views...f.e navbar
// hbs.registerPartials(__dirname + '/views/partials');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const data = beersFromApi;
      res.render('beers', { beers: true, title: 'Our Selection', data: data });
    })
    .catch(error => console.error());
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      const data = beersFromApi;
      res.render('random-beer', {
        randombeer: true,
        title: 'Beers at Random',
        data: data
      });
    })
    .catch(error => console.error());
});
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
