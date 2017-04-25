var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is my secret', // proc.env.SESSSION_SECRET
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


var connectionString = 'mongodb://127.0.0.1:27017/test';

if (process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

var Client = require('node-rest-client').Client;
var rest = new Client();

//require("./test/app.js")(app);
require("./assignment/app.js")(app, mongoose);
require("./project/app.js")(app, mongoose, rest, passport);


var port = process.env.PORT || 3000;

app.listen(port);