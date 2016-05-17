'use strict';

var link = '/imagesearch';
var accKey = "/zw9z97SKJFWPjQYhcpmXEUkPd6YMAwZISczsMJ8fNY";

var Bing = require('node-bing-api')({accKey: accKey});
module.exports = function(app){
    app.get(link + '/:q', function(req,res){
        var offset = 10;
        if (req.query.hasOwnProperty('offset')){
            offset = req.query.offset;
        }
        Bing.composite(req.params.q, {
            top: offset,
            sources: 'image'
        }, function(err, _res, body){
            if (err) throw err;
            var arr = [];
            body.d.results[0].Image.forEach(function(elem){
                var j = {
                    'url': elem.MediaUrl,
                    'snippet': elem.Title,
                    'thumbnail': elem.Thumbnail.MediaUrl,
                    'context' : elem.SourceUrl
                };
                arr.push(j);
            });
            res.json(arr);
        });
    });
}