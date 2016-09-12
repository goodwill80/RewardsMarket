module.exports = function(app) {

var adminController = require('../controllers/admin.controller');

app.route('/add-category')
.get(adminController.catpage)
.post(adminController.chgcat)

}
