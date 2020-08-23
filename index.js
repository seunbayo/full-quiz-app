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



app.get("/highscores", function(req, res){
  res.render("highscores");
});

app.post("/highscores", function(req, res){
  res.redirect("/highscores");
});




app.listen(5000, function () {
    console.log("quiz is up and running");
  });
  