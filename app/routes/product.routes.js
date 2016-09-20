module.exports = function(app) {

var productController = require('../controllers/product.controller');

//all rewards by category id as params
app.route('/rewards/:id')
.get(productController.getPage)

//single reward page
app.route('/reward/:id')
.get(productController.getSinglePage)

app.route('/reward/:reward_id')
.post(productController.postCart)

app.route('/payment')
.post(productController.payment)


}
