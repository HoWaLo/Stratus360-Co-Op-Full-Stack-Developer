var express = require("express");
var request = require("request");

var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080; // create PORT environment

const maxPage = 2475; // the maximum page of the comic

// insert JS file
app.get(`/main.js`, function (req, res) {
  res.sendFile(path.join(__dirname, "/main.js"));
});
// insert CSS file
app.get(`/main.css`, function (req, res) {
  res.sendFile(path.join(__dirname, "/main.css"));
});
// insert the html page to the root page
app.get(`/`, function (req, res) {
  res.sendFile(path.join(__dirname, "/comicMain.html"));
});
request(
  {
    url: `https://xkcd.com/info.0.json`,
    json: true,
  },
  (err, res, body) => {
    app.get(`/info.0.json`, function (req, res) {
      res.send(body);
    });
  }
);

// function for send comic json
function getJson(index) {
  request(
    {
      url: `https://xkcd.com/${index}/info.0.json`,
      json: true,
    },
    (err, res, body) => {
      app.get(`/${index}/info.0.json`, function (req, res) {
        res.send(body);
      });
    }
  );
}

// function of insert the whole comic
function createWeb(max) {
  for (let i = 1; i <= max; i++) {
    // loop from 1 to the maximum page of the comic

    getJson(i); // Call function of comic json

    app.get(`/${i}/page`, function (req, res) {
      // insert html page
      res.sendFile(path.join(__dirname, "/comicMain.html"));
    });
  }
}
createWeb(maxPage); // create webpage for comic

app.listen(HTTP_PORT); //listen PORT
