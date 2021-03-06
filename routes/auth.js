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
  res.render("register", { user: new User(), errors: {} });
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
      let errors = err.errors || {};

      if (err.name === "UserExistsError") {
        errors.username = { message: "This username is already registered" };
      } else if (err.code === 11000) {
        errors.email = { message: "This email is already registered" };
      }
      return res.render("register", { user: newUser, errors });
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

//Password reset route
router.get("/pwr", function (req, res) {
  res.render("pwr");
});

//Logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/home");
});

module.exports = router;
