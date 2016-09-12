module.exports = function(app) {

var productController = require('../controllers/product.controller');

//all rewards by category id as params
app.route('/rewards/:id')
.get(productController.getPage)

//single reward page
app.route('/reward/:id')
.get(productController.getSinglePage)
}
