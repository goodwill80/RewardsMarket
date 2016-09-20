var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');
var Cart = require('mongoose').model('Cart');
var User = require('mongoose').model('User');
var stripe = require('stripe')('sk_test_9kiC8pycQEJhDnUbKD4Cgp9V');
var async = require('async');

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
  stripe.customers.create({
    source: stripeToken,
  }).then(function(customer) {
    return stripe.charges.create({
      amount: currentCharges,
      currency: 'sgd',
      customer: customer.id
    });
  }).then(function(charge){
    async.waterfall([
      function(callback){
        Cart.findOne({owner: req.user._id}, function(err, cart){
          callback(err, cart);
        });
      },
      function(cart, callback){
        User.findOne({_id: req.user._id}, function(err, user) {
          if (user) {
            for(var i = 0; i < cart.items.length; i++) {
              user.history.push({
                item: cart.items[i].item,
                paid: cart.items[i].price
              });
            }
            user.save(function(err, user){
              if(err) return next(err);
              callback(err, user);
            });
          }
        });
      },
      function(user){
        Cart.update({owner: user._id}, { $set: {items: [], total: 0}}, function(err, updated){
          if (updated) {
            res.redirect('/profile');
          }
        } );
      }
    ])
  });

}




}
