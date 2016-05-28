'use strict';

var mongo = require('mongodb').MongoClient;
module.exports = function(app) {

    
    app.get('/shorturl/new/*', function(req, res){
        console.log(req.url);

        var originalurl = req.url.split('/shorturl/new/')[1];
        //console.log(originalurl);
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            var collection = db.collection('urlcode');
            
            collection.find().toArray(function(err, arr){
                if (err) throw err;
                
                var code = arr[0].code;
                
                collection.update({}, {$set :{ 'code': code + 1 }});
                
                collection = db.collection('url');
                //console.log(req.connection.encrypted);
                var shurl = req.get('host') + "/shorturl/" + code;
                var shurljson;
                if (req.connection.encrypted){
                    shurljson = "https://" + req.get('host') + "/shorturl/" + code;
                }
                else {
                    shurljson = "http://" + req.get('host') + "/shorturl/" + code;
                }
                var obj = {"original_url" : originalurl, "short_url": shurl};
                
                res.json({"original_url" : originalurl, "short_url": shurljson});
                
                collection.insert(obj, function(err){
                    if (err) throw err;
                    db.close();
                });
            });
        });
    });
    
    app.get('/shorturl/:code', function(req, res){
        var code = req.params.code;
        mongo.connect(process.env.MONGO_URI, function(err, db){
            if (err) throw err;
            var collection = db.collection('url');
            var short = req.get('host') + "/shorturl/" + code;
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