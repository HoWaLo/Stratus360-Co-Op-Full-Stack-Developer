var express = require("express");
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

// function of insert the whole comic
function createWeb(max) {
  for (let i = 1; i <= max; i++) {
    // loop from 1 to the maximum page of the comic
    app.get(`/${i}/page`, function (req, res) {
      // insert html page
      res.sendFile(path.join(__dirname, "/comicMain.html"));
    });
  }
}
createWeb(maxPage); // create webpage for comic

app.listen(HTTP_PORT); //listen PORT
