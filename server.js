// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Routes
// =============================================================

var notesArr = [
  {
    title: "test",
    desc: "description",
    id: 1
  }
];

// Basic route that sends the user first to the index page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

  // Displays all notes
app.get("/api/notes", function(req, res) {
    return res.json(notesArr);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});