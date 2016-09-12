var router = require('express').Router();
var async = require('async');
var faker = require('faker');
var CategoryModel = require('../app/models/category.model');
var ProductModel = require('../app/models/product.model');
var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');


router.get('/:name', function(req, res, next) {
    async.waterfall([
      function(callback) {
        Category.findOne({ name: req.params.name }, function(err, category) {
          if (err) return next(err);
          callback(null, category);
        });
      },

      function(category, callback) {
        for (var i = 0; i < 2 ; i++) {
          var product = new Product();
          product.category = category._id;
          product.name = faker.commerce.productName();
          product.price = faker.commerce.price();
          product.points = faker.random.number();
          product.image = faker.image.image();

          product.save();
        }
      }
    ]);
    res.json({ message: 'Success' });
});

module.exports = router;
