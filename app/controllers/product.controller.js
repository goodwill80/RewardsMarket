var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');
var Cart = require('mongoose').model('Cart');
var User = require('mongoose').model('User');

module.exports = {

  getPage: function(req, res, next) {
    Product
    .find({ category: req.params.id })
    .populate('category')
    .exec(function(err, products){
      if(err) return next(err);
      res.render('main/category', {
        products: products
      })
    })
  },

  getSinglePage: function(req, res, next) {
    Product.findById({_id: req.params.id}, function(err, product){
    if(err) return next(err);
    res.render('main/product', {product: product
    })
  })
},

postCart: function(req, res, next) {
  Cart.findOne({ owner: req.user._id }, function(err, cart){
    cart.items.push({
      item: req.body.product_id,
      quantity: parseInt(req.body.quantity),
      price: parseFloat(req.body.priceValue),
      points: parseInt(req.body.points)
    })
    cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);
    cart.totalPoints = (cart.totalPoints + parseInt(req.body.points));

    cart.save(function(err) {
      if(err) return next(err);
      return res.redirect('/cart');
    })
  })
},

payment: function(req, res, next) {

  var stripeToken = req.body.stripeToken;
  var currentCharges = Math.round(req.body.stripeMoney * 100);
  stripe.customer.create({
    source: stripeToken,
  }).then(function(customer) {
    return stripe.charges.create ({
      amount: currentCharges,
      currency: 'sgd',
      customer: customer.id
    });
  });
}




}
