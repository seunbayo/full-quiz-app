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


//Index Route
app.get("/", function(req, res){
  res.render("index");
})


app.get("/end", function(req, res){
  res.render("end");
});


app.post("/highscores", function(req, res){
  //get high score data
  var username = req.body.username
  var highscore = req.params.finalScore
  var newUser = {username: usernamename, finalScore: highscore };
  //CREATE A NEW HIGHSCORE AND SAVE TO DB
  highscore.create(newUser, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      //redirect to list of highscores already save
      res.redirect("list of highscore page");
    }
  })
})




app.listen(5000, function () {
    console.log("quiz is up and running");
  });
  