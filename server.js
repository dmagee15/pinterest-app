'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyparser = require('body-parser');
var flash = require('connect-flash');
var path = require('path');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/dev', express.static(process.cwd() + '/dev'));
app.use('/output', express.static(process.cwd() + '/output'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
