//Get winston logging functions
var logger = require('./logger');

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    logger.info('info','Bad request made to API'); 
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Please specify error type' });   
});

// more routes for our API will happen here

// on routes that end in /logError POST and GET
// ----------------------------------------------------

router.route('/logError')
.get(function(req, res) {
    res.json({ message: 'Please post json data to logError API' });  
    logger.error('req.params.ProjectName'); 
})

.post(function(req, res){ 
    var data = req.body;
    logger.error(data);
    res.end('error logged');
})


// on routes that end in /Info POST and GET
// ----------------------------------------------------

router.route('/log/Info')
.get(function(req, res) {
    res.json({ message: 'Please post json data to logInfo API' });  
})

.post(function(req, res){ 
    var data = req.body;
    logger.info(data);
    res.end('info logged');
})

//on routes that ends in error download 
router.route('/log/error/download')
.get(function(req, res) {
    var file = __dirname + '/logs/error.log';
    res.download(file); // Set disposition and send it.
})

//on routes that ends in error download 
router.route('/log/info/download')
.get(function(req, res) {
    var file = __dirname + '/logs/info.log';
    res.download(file); // Set disposition and send it.
})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//Default route if wrong url provided
app.use(function(req, res){
    res.send('Please use the correct API');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
