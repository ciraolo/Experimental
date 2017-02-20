var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
  local: {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ['Coordinatore', 'Area Manager', 'Responsabile Operations']
    },
    password: {
      type: String,
      required: true
    }
  }
});

UserSchema.pre('save', function(next) {
  var user = this.local;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// checking if password is valid
UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};




var User = mongoose.model('User', UserSchema);
module.exports = User;
