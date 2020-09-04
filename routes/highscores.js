var express = require("express");
var router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware/index");



//HIGHSCORE ROUTE
router.get("/end", function (req, res) {
    let callback = (highscores) => {
      res.render("end", { highscores });
    };
    codeToRetrieveHighScoresFromDb(callback);
  });
  
  router.post("/highscores", function (req, res) {
    let callback = () => {
      res.redirect("/highscores");
    };
    codeTopostNewHighScore(re.params.username, req.params.score, callback);
  });


module.exports = router;
