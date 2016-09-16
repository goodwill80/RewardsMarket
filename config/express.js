// INITIALIZER FOR MY EXPRESS APPLICATION
  var express = require('express');
  var morgan = require('morgan');
  //log all get requests in terminal of 404 or 200 etc
  var compress = require('compression');
  var bodyParser = require('body-parser');
	// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property.
  var methodOverride = require('method-override');
	// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  var expressLayouts = require('express-ejs-layouts');
  var ejs = require('ejs');
  var ejsmate = require('ejs-mate');
  var session = require('express-session');
  var cookieParser = require('cookie-parser');
  var flash = require('express-flash');
  var secret = require('./security/secret');
  //refactor my secret and db in confiq file
  var Mongo = require('connect-mongo')(session);
  //store session in mongoDB
  var passport = require('passport');
  var Category1 = require('../app/models/category.model');
  var Category = require('mongoose').model('Category');
  var Cart1 = require('../app/models/cart.model');
  var Cart = require('mongoose').model('Cart');



module.exports = function() {
  var app = express();



  // initialize the required module
  if ( !process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

	app.use(function(req,res,next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "DELETE,PULL,PATCH,PUT");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		next();
	});

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new Mongo({url: secret.database , autoReconnect:true})
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  //makeing user/category object available in all templates hence no need to req.user.profile.name on every route and storing all of them in a local variable call locals
  app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
  })

  //storing category object in a local variable
  app.use(function(req, res, next) {
    Category.find({}, function(err, categories) {
      if (err) return next(err);
      res.locals.categories = categories;
      next();
    });
  });

  //storing of user users in cart object and setting it to a local variable. To also set quantity of purchase
  app.use(function(req, res, next){
    if (req.user) {
      var total = 0;
      Cart.findOne({ owner: req.user._id }, function(err, cart) {
        if (cart) {
          for (var i = 0; i < cart.items.length; i++) {
            total += cart.items[i].quantity;
          }
          res.locals.cart = total;
        } else {
          res.locals.cart = 0;
        }
        next();
      })
    } else {
      next();
    }
  })

	app.use(methodOverride());
  app.set('views', './app/views');
  app.engine('ejs', ejsmate);
  app.set('view engine', 'ejs')
  // app.use(expressLayouts);

  var apiRoutes = require('../api/api');
  app.use('/api', apiRoutes);



  require('../app/routes/static.routes')(app);
  require('../app/routes/user.routes')(app);
  require('../app/routes/admin.routes')(app);
  require('../app/routes/product.routes')(app);
  require('../app/routes/cart.routes')(app);
  app.use(express.static('./public'));

  return app;
};
