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

var notes = [
  {
    title: "test",
    desc: "description",
    id: 1
  }
];

// function updateDB () {
//   fs.appendFile("./db/db.json", notes, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });
// }

// Basic route that sends the user first to the index page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

  // Displays all notes
app.get("/api/notes", function(req, res) {
    return res.json(notes);
});

app.post("/db/db.json", function(req, res) {
  
  var newNote = req.body

  newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

  console.log(newNote);
  
  notes.push(newNote);
  
  res.json(newNote);

})

app.get("/db/db.json", function(req, res) {
  return res.json(notes);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});