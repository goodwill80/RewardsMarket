var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


  var UserSchema = new Schema({

    email: { type: String, unique: true, lowercase: true},
    password: String,

    profile: {
      name: { type: String, default: ''},
      dob: { type: Date, default: ''},
      picture: { type: String, default: ''}
    },
    points: Number,
    membership: [ {type: String} ],
    address: String,
    history: [{
      date: Date,
      paid: { type: Number, default: 0},
      item: { type: Schema.Types.ObjectId, ref: 'Product'}
    }]
  });

// before saving into moongoose. Passing salt to maskoff the password i.e. kj82130#$%#%#
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// compare password in the database and the one user type in
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) return 'https://gravater.com/avatar/?s' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avartar/' + md5 + '?s=' + size + '&d=retro';
}


mongoose.model('User', UserSchema);
