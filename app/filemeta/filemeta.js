'use strict'

var multer = require('multer');
var upload = multer({ dest : 'tmp/'});
var path = require('path');
var fs =require('fs');
module.exports = function(app){
	app.get('/filemeta', function(req, res){
		res.sendFile(path.join(__dirname, '../../public/filemeta.html'));
	});

	app.post('/filemeta', upload.single('file'), function(req, res, next){
		//console.log(req.file);
		res.json({size: req.file.size});
		fs.unlink(path.join('tmp',req.file.filename), function(err){
			if (err) throw err;
		});
	});
}