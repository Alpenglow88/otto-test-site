const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const package = require("./package.json");
const version = package.version;

// Exposes css from public folder to Express
app.use(express.static("public"));

// Sets global favicon route
app.use(
  "/favicon.ico",
  express.static("./public/assets/otto-favicons/favicon.ico")
);

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
  res.render("pages/playground", { version: version });
});

app.get("/home", (req, res) => {
  res.render("pages/test_pages/home", { version: version });
});

app.get("/about", (req, res) => {
  res.render("pages/about", { version: version });
});

app.get("/waiting", (req, res) => {
  res.render("pages/waiting", { version: version });
});

app.get("/faq", (req, res) => {
  res.render("pages/faq", { version: version });
});

app.get("/otto-tool", (req, res) => {
  res.render("pages/otto-tool", { version: version });
});

app.get("/lessons", (req, res) => {
  res.render("pages/lessons", { version: version });
});

app.get("/video-playback", (req, res) => {
  res.render("pages/video_playback_pages/video-playback", { version: version });
});

app.get("/video-playback-index", (req, res) => {
  res.render("pages/video_playback_pages/video-playback-index", { version: version });
});

app.get("/video-playback-mp4", (req, res) => {
  res.render("pages/video_playback_pages/video-playback-mp4", { version: version });
});

app.get("/video-playback-dash-vod", (req, res) => {
  res.render("pages/video_playback_pages/video-playback-dash-vod", { version: version });
});

app.get("/video-playback-hls-vod", (req, res) => {
  res.render("pages/video_playback_pages/video-playback-hls-vod", { version: version });
});

app.get("/video-playback-live", (req, res) => {
  res.render("pages/video_playback_pages/video-playback-live", { version: version });
});

app.get("/video-playback-multi-audio", (req, res) => {
  res.render("pages/video_playback_pages/video-playback-multi-audio", { version: version });
});

app.get("/video-playback-captions", (req, res) => {
  res.render("pages/video_playback_pages/video-playback-captions", { version: version });
});

app.get("/video-playback-drm-index", (req, res) => {
  res.render("pages/video_playback_pages/drm/video-playback-drm-index", { version: version });
});

app.get("/video-playback-drm-wv-no-auth", (req, res) => {
  res.render("pages/video_playback_pages/drm/widevine/video-playback-drm-wv-no-auth", { version: version });
});

app.get("/video-playback-drm-wv-header-auth", (req, res) => {
  res.render("pages/video_playback_pages/drm/widevine/video-playback-drm-wv-header-auth", { version: version });
});

app.get("/video-playback-drm-wv-param-auth", (req, res) => {
  res.render("pages/video_playback_pages/drm/widevine/video-playback-drm-wv-param-auth", { version: version });
});

app.get("/video-playback-drm-wv-cookie-auth", (req, res) => {
  res.render("pages/waiting", { version: version });
});

// app.get("/video-playback-drm-wv-cookie-auth", (req, res) => {
//   res.render("pages/video_playback_pages/drm/widevine/video-playback-drm-wv-cookie-auth", { version: version });
// });

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

app.get("/walle", (req, res) => {
  res.render("pages/test_pages/asset_pages/walle", {
    version: version,
  });
});

app.get("/dredd", (req, res) => {
  res.render("pages/test_pages/asset_pages/dredd", {
    version: version,
  });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact-us", {
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

app.get("/non-visible-elements", (req, res) => {
  res.render("pages/test_pages/non-visible-elements", {
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

