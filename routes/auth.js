// =====================
//AUTH ROUTES
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");




//HOMEPAGE ROUTE
router.get("/", function (req, res) {
    res.render("home");
  });

//Auth PAges
router.get("/auth", function (req, res) {
  res.render("auth");
});

//SHow the register form
router.get("/register", function (req, res) {
  res.render("register");
});

//Handle SignUp logic
router.post("/register", function (req, res) {
  var newUser = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/level");
    });
  });
});

//Show login form
router.get("/login", function (req, res) {
  res.render("login");
});

// HAndling login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/level",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//Logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/home");
});


module.exports = router;