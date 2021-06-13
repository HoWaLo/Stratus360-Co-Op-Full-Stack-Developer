var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 8080;

const maxPage = 2475;

app.get(`/main.js`, function (req, res) {
  res.sendFile(path.join(__dirname, "/main.js"));
});
app.get(`/main.css`, function (req, res) {
  res.sendFile(path.join(__dirname, "/main.css"));
});

app.get(`/`, function (req, res) {
  res.sendFile(path.join(__dirname, "/comicMain.html"));
});

function createWeb(max) {
  for (let i = 1; i <= max; i++) {
    app.get(`/${i}/page`, function (req, res) {
      res.sendFile(path.join(__dirname, "/comicMain.html"));
    });
  }
}
createWeb(maxPage);

app.listen(HTTP_PORT);
