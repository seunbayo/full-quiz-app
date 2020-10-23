var express = require("express");
var router = express.Router();
var User = require("../models/user");
// var middleware = require("../middleware/index");

router.get("/highscores", (req, res, next) => {
  console.log("helo", req.user);

  /* if (req.user !== undefined) {
    updateHighscoreForUser(req.user._id, req.query.score);
  } */

  // res.render("highscores", { users: await topTenUsers() });
  topTenUsers ()
    .then((users) => {
      console.log('promise result');
      
      res.render("highscores", { users });
    })
    console.log('bye');
    
});

async function updateHighscoreForUser(userId, score) {
  //find the user
  var user = await User.findById(userId);
  //compare the score
  if (score > user.highScore) {
    //update the highscore
    await User.findByIdAndUpdate(user._id, { highScore: score });
  }
}

function topTenUsers() {
  //use the find method on the User model to search for in the database.

  var result = User.find().sort({ highScore: -1 }).limit(10);
  console.log("hi", result);
  return result;
}

module.exports = router;
