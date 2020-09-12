var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
      },
      fullname: {
        type: String,
        required: true
      },
      username : {
        type: String,
        required: true,
        minlength: 2,
      },
      highScore : {
        type: Number,
        default: 0,
        min: 0,
      }
    });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);