'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


// My code
/*
	Timestamp Microservice FCC
*/
app.get('/timestamp', function(req, res){
	res.send("Welcome to timestamp");
});

app.get('/timestamp/:time', function(req, res){
	var MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var timestr = req.params.time;
	console.log(timestr);
	if (isNaN(timestr)){
		var date = new Date(timestr);
		var dateString = MONTH[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		var jdate = {
			"unix" : date.getTime() / 1000,
			"natural" : dateString
		};
		res.json(jdate);
	}
	else {
		var time = parseInt(timestr);
		var date = new Date(time * 1000);
		var dateString = MONTH[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		var jdate = {
			"unix" : time,
			"natural" : dateString
		};
		res.json(jdate);
	}
});