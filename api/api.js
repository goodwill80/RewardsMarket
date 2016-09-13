var router = require('express').Router();
var async = require('async');
var faker = require('faker');
var CategoryModel = require('../app/models/category.model');
var ProductModel = require('../app/models/product.model');
var UserModel = require('../app/models/user.model');
var Category = require('mongoose').model('Category');
var Product = require('mongoose').model('Product');
var User = require('mongoose').model('User');
var mongoose = require('mongoose');


// router.get('/:name', function(req, res, next) {
//     async.waterfall([
//       function(callback) {
//         Category.findOne({ name: req.params.name }, function(err, category) {
//           if (err) return next(err);
//           callback(null, category);
//         });
//       },
//
//       function(category, callback) {
//         for (var i = 0; i < 2 ; i++) {
//           var product = new Product();
//           product.category = category._id;
//           product.name = faker.commerce.productName();
//           product.price = faker.commerce.price();
//           product.points = faker.random.number();
//           product.image = faker.image.image();
//
//           product.save();
//         }
//       }
//     ]);
//     res.json({ message: 'Success' });
// });


//PRODUCT API ROUTES
//Get all Products
router.get('/rewards', function(req, res, next){
  Product.find(function(err, products){
    if(err){
      res.send(err);
    } else {
      res.json(products);
    }
  });
});

// Get Single Product
router.get('/rewards/:id', function(req, res, next){
  var id = req.params.id;
  Product.findOne({_id: id}, function(err, product) {
    if (err) {
      res.send(err);
    } else {
      res.json(product);
    }
  });
});

//create and save product
router.post('/rewards', function(req, res, next){
var product = new Product(req.body);
product.save(function(err){
  if (err) return next (err);
  res.json(product)
});
});


// update product
router.put('/rewards/:id', function(req, res, next){
  var id = req.params.id;
  Product.findByIdAndUpdate({_id: id}, req.body, function(err, product) {
        if (err) {
          return next(err);
        } else {
          res.json(product);
        }
      });
    });

// delete product
router.delete('/rewards/:id', function(req, res, next){
  var id = req.params.id;

  Product.findOne({_id: id}, function(err, product) {
    product.remove();
    if (err) return next(err);
    res.json(product);
  });

});

// USER Routes
//Get all users
router.get('/users', function(req, res, next){
  User.find(function(err, users){
    if(err){
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

//Get a single user router.get('/rewards/:id', function(req, res, next){
router.get('/users/:id', function(req, res, next){
  var id = req.params.id;
  User.findOne({_id: id}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

//create a single user
router.post('/users', function(req, res, next){
var user = new User(req.body);
user.save(function(err){
  if (err) return next (err);
  res.json(user)
});
});

//update a single user
router.put('/users/:id', function(req, res, next){
  var id = req.params.id;
  User.findByIdAndUpdate({_id: id}, req.body, function(err, user) {
        if (err) {
          return next(err);
        } else {
          res.json(user);
        }
      });
    });


module.exports = router;
