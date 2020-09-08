var express = require("express");
var router = express.Router();
var User = require("../models/user");
// var middleware = require("../middleware/index");

// router.post('/highscores', (async (req, res, next) => {
//   var { email, score } = req.body;
//   //grabbed the email and score values from the request body,used the updateOne method on the UserModel
//   await User.updateOne({ email }, { highScore: final-score-input });
//   res.redirect("end")
// }));

router.get("/highscores", async (req, res, next) => {
  console.log("helo", req.user);

  //find the user
  var user = await User.findById(req.user._id);
  //compare the score
  if (req.query.score > user.highScore) {
    //update the highscore
    var score = req.query.score
    await User.findByIdAndUpdate(user._id, { highScore: score });
  }
  //use the find method on the User model to search for in the database.
  var users = await User.find().sort({ highScore: -1 }).limit(10);
  res.render("highscores", { users });
});

module.exports = router;
