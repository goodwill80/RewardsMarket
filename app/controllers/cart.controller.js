var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');
var Cart = require('mongoose').model('Cart');
var User = require('mongoose').model('User');




module.exports = {

cartpage: function(req, res, next){
  Cart
    .findOne({ owner: req.user._id })
    .populate('items.item')
    .exec(function(err, foundCart) {
      if (err) return next(err);
      res.render('main/cart', {
        foundCart: foundCart, message: req.flash('remove')
  })
})
},

remove: function(req, res, next) {
  Cart.findOne({owner: req.user._id}, function(err, foundCart){
    foundCart.items.pull(String(req.body.item));

    foundCart.total = (foundCart.total - parseFloat(req.body.price)).toFixed(2);
    foundCart.totalPoints = (foundCart.total - parseInt(req.body.points));
    foundCart.save(function(err, found){
      if (err) return next(err);
      req.flash('remove',"Successfully removed");
      res.redirect('/cart');
    })
  })
},






}
