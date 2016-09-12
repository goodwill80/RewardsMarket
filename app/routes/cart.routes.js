module.exports = function(app) {

var cartController = require('../controllers/cart.controller');

app.route('/cart')
.get(cartController.cartpage)

app.route('/remove')
.post(cartController.remove)



}
