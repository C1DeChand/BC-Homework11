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

const jsonArray = require("./db/db.json")

// Basic route that sends the user first to the index page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

  // Displays all notes
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function(req, res) {

  console.log(req.body);
  var note = req.body;
  jsonArray.push(note)

  fs.writeFile("./db/db.json", JSON.stringify(jsonArray), "utf-8", function(err, data) {
    if (err) throw err
  });

});

app.delete("/api/notes/:id", function(req, res) {
  let noteID = req.params.id
  console.log(noteID)
  const notesArr = jsonArray
  console.log(notesArr)
  let filtered = notesArr.filter(note => note.id !== noteID);
  console.log(filtered)

  fs.writeFile("./db/db.json", JSON.stringify(filtered), "utf-8", function(err, data) {
    if (err) throw err
  });
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});