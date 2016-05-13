'use strict';

var mongo = require('mongodb').MongoClient;

module.exports = function(app) {

    
    app.get('/shorturl/new/*', function(req, res){
        var originalurl = req.url.substr(14, req.url.length);
        mongo.connect('mongodb://localhost:27017/shorturl', function(err, db){
            if (err) throw err;
            var collection = db.collection('urlcode');
            
            collection.find().toArray(function(err, arr){
                if (err) throw err;
                
                var code = arr[0].code;
                
                collection.update({}, {$set :{ 'code': code + 1 }});
                
                collection = db.collection('url');
                
                var obj = {"original_url" : originalurl, "short_url": "https://" + 
                req.get('host') + "/shorturl/" + code};
                
                res.json(obj);
                
                collection.insert(obj, function(err){
                    if (err) throw err;
                    db.close();
                });
            });
        });
    });
    
    app.get('/shorturl/:code', function(req, res){
        var code = req.params.code;
        mongo.connect('mongodb://localhost:27017/shorturl', function(err, db){
            if (err) throw err;
            var collection = db.collection('url');
            var short = "https://" + req.get('host') + "/shorturl/" + code;
            collection.find({'short_url' : short}).toArray(function(err, arr){
                    if (err) throw err;
                    if (arr.length !== 0){
                        //console.log(arr[0].original_url);
                        res.redirect(arr[0].original_url);
                    }
                    else {
                        //console.log('Not found in database');
                        res.send('Not found in database');
                    }
                    db.close();
                });
        });
    });
}