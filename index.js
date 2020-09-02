var express = require("express");
var app = express();
// import body parser
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");

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
//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "rusty is UGLY",
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

//============================================
//              ROUTES
//HOMEPAGE ROUTE
app.get("/", function (req, res) {
  res.render("home");
});

//LEVEL ROUTE
app.get("/level", function (req, res) {
  res.render("level");
});

//COURSE ROUTE
app.get("/course", function (req, res) {
  res.render("course");
});

//Difficulty Route
app.get("/diff", function (req, res) {
  res.render("diff");
});

//GAME ROUTE
app.get("/game", function (req, res) {
  res.render("game");
});

//HIGHSCORE ROUTE
app.get("/end", function (req, res) {
  let callback = (highscores) => {
    res.render("end", { highscores });
  };
  codeToRetrieveHighScoresFromDb(callback);
});

app.post("/highscores", function (req, res) {
  let callback = () => {
    res.redirect("/highscores");
  };
  codeTopostNewHighScore(re.params.username, req.params.score, callback);
});

// =====================
//AUTH ROUTES
// =====================

//SHow the register form
app.get("/register", function(req, res){
  res.render("register") 
})

//Handle SignUp logic
app.post("/register", function(req, res){
  var newUser = new User({fullname: req.body.fullname, username: req.body.username, email: req.body.email});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/level")
    });
  })
});

app.listen(5000, function () {
  console.log("quiz is up and running");
});
