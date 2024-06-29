var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mathsolver  = require("./mathsolver.js");
var calcmetrics = require("./calcmetrics.js");
var xray        = require('aws-xray-sdk');
var querystring = require('querystring');
var shortid     = require('shortid');

var serviceName = "CALCULATOR";
var servicePort = 8080;

xray.middleware.setSamplingRules('sampling-rules.json');
var http = xray.captureHTTPs(require('http'));

app.use(xray.express.openSegment(serviceName));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || servicePort;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: `welcome from the ${serviceName} service` });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(xray.express.closeSegment());

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`${serviceName} service listening on port: ` + port);

var exampleExpression1 = "curl --data-urlencode \"calcid=1234\" --data-urlencode \"expression=(5+3)/2\" http://localhost:8080/api/calc"

console.log("********************************************");
console.log("********************************************");
console.log("sample calculator test commands:");
console.log(`${exampleExpression1}`);
console.log(`${exampleExpression2}`);
console.log(`${exampleExpression3}`);
console.log(`${exampleExpression4}`);
console.log(`${exampleExpression5}`);
console.log(`${exampleExpression6}`);
console.log("note: the optional calcid param will be added as an annotation to the xray trace")
console.log("********************************************");
console.log("********************************************");