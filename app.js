const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const package = require('./package.json');
const version = package.version

// Exposes css from public folder to Express
app.use(express.static('public'));

// Sets view enngine as EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));




// Sets root routing and defines what is seen there
app.get('/', (req, res) => {
  res.render('pages/landing-page', {version: version});
});

app.get('/index', (req, res) => {
  res.render('pages/index', {version: version});
});

// app.post('/', (req, res) => {
//     res.render('initial-test-page')
// })

app.get('/test-pages-home', (req, res) => {
  res.render('pages/test_pages/test-pages-home', {version: version});
});

app.get('/about', (req, res) => {
  res.render('pages/about-page', {version: version});
});

app.get('/waiting', (req, res) => {
  res.render('pages/waiting', {version: version});
});

app.get('/test', (req, res) => {
  res.render('pages/waiting', {version: version});
});

app.get('/otto-tool', (req, res) => {
  res.render('pages/otto-tool-page', {version: version});
});

app.get('/lessons', (req, res) => {
  res.render('pages/lessons-page', {version: version});
});


// app.post('/index', function (req, res) {
//     let city = req.body.city;

//     if(city === 'Cape Town'){
//         let passingReturnText = `Bravo, ${city} is correct`
//         res.render('return', {city: city, returnText: passingReturnText});
//     } else {
//         let failingReturnText = `${city} is not Cape Town :(`
//         res.render('return', {city: city, returnText: failingReturnText});
//         }
// })

// Sets application to be on port 3000 or dynamic port assigned from heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});