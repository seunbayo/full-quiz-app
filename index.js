var express = require("express");
var app = express();
// import body parser
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


//use files from public directory
app.use(express.static(__dirname + "/public"));
//use body parser
app.use(bodyParser.urlencoded({ extended: true }));
//GET PAGES FROM VIEW
app.set("view engine", "ejs");
//USE MONGOOSE
mongoose.connect("mongodb://localhost/quiz_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//============================================
//              ROUTES
//HOMEPAGE ROUTE
app.get("/", function(req, res){
  res.render("home");
});

//LEVEL ROUTE
app.get("/level", function(req, res){
  res.render("level")
});

//COURSE ROUTE
app.get("/course", function(req, res){
  res.render("course")
});

//Difficulty Route
app.get("/diff", function(req, res){
  res.render("diff")
});

//GAME ROUTE
app.get("/game", function(req, res){
  res.render("game")
});

//HIGHSCORE ROUTE
app.get("/end", function(req, res){
  
  res.render("end")
});


app.post("/highscores", function(req, res){
  res.redirect("/highscores");
});




app.listen(5000, function () {
    console.log("quiz is up and running");
  });
  