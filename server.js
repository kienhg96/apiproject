'use strict';

var express = require('express');
require('dotenv').load();
var app = express();
app.use('/public', express.static(__dirname + '/public'));
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


// My code
/*
	Timestamp Microservice FCC
*/

app.get('/', function(req, res){
	res.sendFile(__dirname + "/public/")
});

app.get('/timestamp', function(req, res){
	res.sendFile(__dirname + "/public/timestamp.html");
});

app.get('/timestamp/:time', function(req, res){
	var MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var timestr = req.params.time;
	//console.log(timestr);
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

// Who am i
var whoami = require('./app/whoami/whoami.js');
whoami(app);

// Shorten URL

var shorturl = require('./app/shorturl/shorturl.js');
app.get('/shorturl', function(req, res){
	res.sendFile(__dirname + "/public/shorturl.html");
});
shorturl(app);

// Image search


var imgsearch = require('./app/imagesearch/imagesearch.js');

app.get('/imagesearch', function(req, res){
   res.sendFile(__dirname + "/public/imagesearch.html");
});
imgsearch(app);

var filemeta = require('./app/filemeta/filemeta.js');
filemeta(app);