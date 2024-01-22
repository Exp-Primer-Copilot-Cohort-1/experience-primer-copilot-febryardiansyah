// create web server with express
// http://localhost:3000/comments
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var multer = require("multer");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// connect to the database
mongoose.connect("mongodb://localhost/comments");

// create a schema for the database
var commentSchema = new Schema({
  name: String,
  comment: String,
});

// create a model for the database
var Comment = mongoose.model("Comment", commentSchema);

// set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// set up multer
app.use(multer({ dest: "./uploads/" }).single("photo"));

// set up the template engine
app.set("view engine", "ejs");

// set up the static files
app.use(express.static("./public"));

// set up the home page
app.get("/", function (req, res) {
  res.render("index");
});

// set up the comments page
app.get("/comments", function (req, res) {
  // get all the comments from the database
  Comment.find({}, function (err, data) {
    if (err) throw err;
    res.render("comments", { comments: data });
  });
});

// set up the upload page
app.get("/upload", function (req, res) {
  res.render("upload");
});

// set up the upload page
app.post("/upload", function (req, res) {
  // get the file name
  var filename = req.file.filename;
  // get the file type
  var mimetype = req.file.mimetype;
  // get the path of the file
  var path = req.file.path;
  // get the original name of the file
  var originalname = req.file.originalname;
  // get the size of the file
  var size = req.file.size;

  // display the file information
  res.send(
    "File uploaded: " +
      "<br>" +
      "File name: " +
      filename +
      "<br>" +
      "File type: " +
      mimetype +
      "<br>" +
      "File path: " +
      path +
      "<br>" +
      "Original file name: " +
      originalname +
      "<br>" +
      "File size: " +
      size
  );
});

// set up the post route
app.post("/comments", function (req, res) {
  // get the name and comment from the request
  var name = req.body.name;
  var comment = req.body.comment;

  // create a new comment
  var newComment = new Comment({
    name: name,
    comment: comment,
  });

  // save the comment to the database
  newComment.save(function (err) {
    if (err) throw err;
    res.redirect("/comments");
  });
});
