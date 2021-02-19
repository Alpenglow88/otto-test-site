const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const package = require("./package.json");
const version = package.version;

// Exposes css from public folder to Express
app.use(express.static("public"));

// Sets view engine as EJS
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Sets root routing and defines what is seen there
app.get("/", (req, res) => {
  res.render("pages/landing-page", { version: version });
});

app.get("/index", (req, res) => {
  res.render("pages/index", { version: version });
});

app.get("/playground", (req, res) => {
  res.render("pages/playground-page", { version: version });
});

app.get("/home", (req, res) => {
  res.render("pages/test_pages/home", { version: version });
});

app.get("/about", (req, res) => {
  res.render("pages/about-page", { version: version });
});

app.get("/waiting", (req, res) => {
  res.render("pages/waiting", { version: version });
});

app.get("/test", (req, res) => {
  res.render("pages/waiting", { version: version });
});

app.get("/otto-tool", (req, res) => {
  res.render("pages/otto-tool-page", { version: version });
});

app.get("/lessons", (req, res) => {
  res.render("pages/lessons-page", { version: version });
});

app.get("/return", (req, res) => {
  res.render("pages/return", { version: version });
});

app.get("/success-button-click", (req, res) => {
  res.render("pages/success-button-click", { version: version });
});

app.get("/text-entry-field", (req, res) => {
  res.render("pages/test_pages/text-entry-field", {
    version: version,
  });
});

app.post("/success-text-entry", (req, res) => {
  let text = req.body.text_entry;
  res.render("pages/test_pages/text-entry-success", {
    version: version,
    text: text,
  });
});

app.get("/dropdown-menu", (req, res) => {
  res.render("pages/test_pages/dropdown-menus", {
    version: version,
  });
});

app.get("/totoro", (req, res) => {
  res.render("pages/test_pages/asset_pages/totoro", {
    version: version,
  });
});

app.get("/ariel", (req, res) => {
  res.render("pages/test_pages/asset_pages/ariel", {
    version: version,
  });
});

app.get("/dredd", (req, res) => {
  res.render("pages/test_pages/asset_pages/dredd", {
    version: version,
  });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact-us-page", {
    version: version,
  });
});

app.get("/duplicate-id", (req, res) => {
  res.render("pages/test_pages/duplicate-test-id", {
    version: version,
  });
});

app.get("/no-test-id", (req, res) => {
  res.render("pages/test_pages/no-test-id", {
    version: version,
  });
});

app.get("/test-api-data", (req, res) => {
  res.render("pages/test_pages/test-api-data", {
    version: version,
  });
});

// Sets application to be on port 3000 or dynamic port assigned from Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});

// app.post('/home', function (req, res) {
//     let city = req.body.city;

//     if(city === 'Cape Town'){
//         let passingReturnText = `Bravo, ${city} is correct`
//         res.render('pages/return', {city: city, returnText: passingReturnText});
//     } else {
//         let failingReturnText = `${city} is not Cape Town :(`
//         res.render('pages/return', {city: city, returnText: failingReturnText});
//         }
// })

// app.post('/home', (req, res) => {
//     res.render('pages/return')
// })
