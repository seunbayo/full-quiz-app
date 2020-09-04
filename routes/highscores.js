var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware/index");




//HIGHSCORE ROUTE
// router.get("/end", middleware.isLoggedIn, function (req, res) {
//     let callback = (highscores) => {
//       res.render("end", { highscores });
//     };
//     codeToRetrieveHighScoresFromDb(callback);
//   });
  
//   router.post("/highscores", function (req, res) {
//     let callback = () => {
//       res.redirect("/highscores");
//     };
//     codeTopostNewHighScore(re.params.username, req.params.score, callback);
//   });
router.post('/highscores', Middleware(async (req, res, next) => {
  var { email, score } = req.body;
  //grabbed the email and score values from the request body,used the updateOne method on the UserModel
  await User.updateOne({ email }, { highScore: score });

}));
 
router.get('/end', Middleware(async (req, res, next) => {
  //use the find method on the User model to search for in the database.
  var users = await User.find({}, 'name highScore -_id').sort({ highScore: -1}).limit(10);
}));


module.exports = router;
