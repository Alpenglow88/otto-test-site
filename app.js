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
app.get('/', function (req, res) {
  res.render('pages/landing-page', {version: version});
});

app.get('/index', function (req, res) {
  res.render('pages/index', {version: version});
});

// app.post('/', function (req, res) {
//     res.render('initial-test-page')
// })

app.get('/test-pages-home', function (req, res) {
  res.render('pages/test_pages/test-pages-home', {version: version});
});

app.get('/about', function (req, res) {
  res.render('pages/about-page', {version: version});
});

app.get('/waiting', function (req, res) {
  res.render('pages/waiting', {version: version});
});

app.get('/test', function (req, res) {
  res.render('pages/waiting', {version: version});
});

app.get('/otto-tool', function (req, res) {
  res.render('pages/otto-tool-page', {version: version});
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

// Sets application to be on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});