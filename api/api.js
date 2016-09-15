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
var user = new User();
user.profile.name = req.body.name;
user.email = req.body.email;
user.password = req.body.password;
user.profile.picture = req.body.picture;
user.profile.dob = req.body.dob;
user.address = req.body.address;
user.membership = req.body.membership;
user.password = req.body.password;
user.points = req.body.points;
user.save(function(err){
  if (err) return next (err);
  res.json(user);
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

  router.delete('/users/:id', function(req, res, next){
    var id = req.params.id;

    User.findOne({_id: id}, function(err, user) {
    User.remove();
    if (err) return next(err);
    res.json(user);
      });

    });



//Get all Categories
router.get('/category', function(req, res, next){
  Category.find(function(err, cat){
    if (err){
      res.send(err);
    } else {
      res.json(cat);
    }
  });
});

    //Create New Category
    router.post('/category', function(req, res, next) {
      var cat = new Category(req.body);
      cat.save(function(err){
        if (err) return (err);
        res.json(cat);
      })
    })



module.exports = router;
