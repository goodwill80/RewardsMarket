var Category = require('mongoose').model('Category');

module.exports = {

  catpage: function(req, res, next){
    res.render('admin/add-category', { message: req.flash('success')});
  },

  chgcat: function(req, res, next) {
    var category = new Category();
    category.name = req.body.name;

    category.save(function(err){
      if (err) return next (err);
      req.flash('success', "Successfully created");
      return res.redirect('/add-category');
    })
  }



}
