var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');

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
}




}
