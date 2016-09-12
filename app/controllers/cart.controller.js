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
        foundCart: foundCart
  })
})
}




}
