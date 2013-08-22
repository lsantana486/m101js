var express = require('../../../node_modules/express')
  , app = express() // Web framework to handle routing requests
  , cons = require('../../../node_modules/consolidate') // Templating library adapter for Express
  , MongoClient = require('../../../node_modules/mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes'); // Routes for our application

MongoClient.connect('mongodb://200.26.166.241:27017/blog', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());

    // Application routes
    routes(app, db);

    app.listen(process.env.PORT);
    console.log('Express server listening on port ' + process.env.PORT);
});
