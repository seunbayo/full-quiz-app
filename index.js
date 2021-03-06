var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");


//Using routes
var authRoutes = require("./routes/auth");
var gameRoutes = require("./routes/game");
var scoreRoutes = require("./routes/highscores");



//use files from public directory
app.use(express.static(__dirname + "/public"));
//use body parser
app.use(bodyParser.urlencoded({ extended: true }));
//GET PAGES FROM VIEW
app.set("view engine", "ejs");

// passport.use(new CookieStrategy(
  // function (token, done) {
    // User.findByToken({token: token}, function (err, user) {
      // if(err){return done(err)}
      // if (!user) {return done(null, false); }
      // return done(null, user);
    // });
  // }
// ));
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
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

      
app.use(authRoutes);
app.use(gameRoutes);
app.use(scoreRoutes);


var port = 5000;
if (process.env.PORT) {
  port = process.env.PORT;
}

app.listen(port, function () {
  console.log("quiz App server is running");
});