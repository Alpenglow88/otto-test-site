const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Exposes css from public folder to Express
app.use(express.static('public'));

// Sets view enngine as EJS
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));




// Sets root routing and defines what is seen there
app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {
    let city = req.body.city;

    if(city === 'Cape Town'){
        let passingReturnText = `Bravo, ${city} is correct`
        res.render('return', {city: city, returnText: passingReturnText});
    } else {
        let failingReturnText = `${city} is not Cape Town :(`
        res.render('return', {city: city, returnText: failingReturnText});
        }
})

app.get('/waiting', function (req, res) {
  res.render('waiting');
});


// Sets application to be on port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});