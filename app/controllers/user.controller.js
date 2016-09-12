var User = require('mongoose').model('User');
var Cart = require('mongoose').model('Cart');
var passport = require('passport');
var passportConfig = require('../../config/security/passport')(passport);
var async = require('async');

module.exports = {

//signup new members
  signup: function(req, res, next){
    res.render('members/signup', { errors: req.flash('errors')
  });
},

  create: function(req, res, next) {

    async.waterfall([
      function(callback) {
        var user = new User();

        user.profile.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.profile.picture = user.gravatar();

        User.findOne({email: req.body.email}, function(err, existingUser){

          if (existingUser) {
            req.flash('errors', "Account email already exists");
            return res.redirect('/signup');
          } else {
            user.save(function(err, user){
              if (err) return next(err);
              callback(null, user);
            });
          }
        })
      },

      function(user) {
        var cart= new Cart();
        cart.owner = user._id;
        cart.save(function(err){
          if (err) return next (err);
            //user pass in to req.logIn - adding session and cookie to the browser
          req.logIn(user, function(err){
            if (err) return next (err);
            res.redirect('/profile');
        })
      })
      }
    ])
},

//members login
  login: function(req, res, next) {
    if(req.user) return res.redirect('/');
    res.render('members/login'), {message: req.flash('loginMessage')}
},

  postlogin: function(req, res, next) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
  return loginStrategy(req, res, next);
},

//members profile
  profile: function (req, res, next) {
    User.findOne({_id: req.user._id}, function(err, user){
      if (err) return next (err);
      res.render('members/profile', { user: user});
    })
  },

//edit profile
  editpage: function (req, res, next) {
    res.render('members/edit-profile', { message: req.flash('success')});
  },

  edit: function (req, res, next) {
    User.findOne({_id: req.user._id}, function(err, user){
      if(err) return next(err);

      if(req.body.name) user.profile.name = req.body.name;
      if(req.body.address) user.address = req.body.address;

      user.save(function(err){
        if (err) return next (err);
        req.flash("success", "Successfully Edited Profile");
        return res.redirect('/profile')
      })
    })
  },

//logout
  logout: function (req, res, next){
    req.logout();
    res.redirect('/');
  }


}
