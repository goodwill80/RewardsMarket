var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');
var Cart = require('mongoose').model('Cart');
module.exports = {

  index: function(req, res) {

    Product
    .find()
    .populate('category')
    .exec(function (err, products){
      if(err) return next(err);
      res.render('main/home', {
        products: products
    })
  })
  },

  about: function(req, res) {
    res.render('main/about');
  },

  contactus: function(req, res){
      res.render('main/contactus');
  }


}
