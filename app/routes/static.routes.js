module.exports = function(app) {

	var staticController = require('../controllers/static.controller');

	app.route('/')
	.get(staticController.index)

	app.route('/about')
	.get(staticController.about)



 };
