module.exports = function(app) {

	var userController = require('../controllers/user.controller');

	app.route('/signup')
	.get(userController.signup)
	.post(userController.create)

	app.route('/login')
	.get(userController.login)
	.post(userController.postlogin)

	app.route('/profile')
	.get(userController.profile)

	app.route('/logout')
	.get(userController.logout)

	app.route('/edit-profile')
	.get(userController.editpage)
	.post(userController.edit)

 };
