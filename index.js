var express = require("express");
var app = express();



//add files from public directory
app.use(express.static(__dirname + "/public"));






app.listen(5000, function () {
    console.log("quiz is up and running");
  });
  