'use strict';

module.exports = function(app) {
    app.get('/whoami', function(req, res){
        var ip = req.headers['x-forwarded-for'] ;
        var os = req.headers['user-agent'].split('(')[1].split(')')[0];
        var lang = req.headers['accept-language'].split(',')[0];
        var j = {
            'ipaddress' : ip,
            'language' : lang, 
            'software' : os
        };
        res.json(j);
    });
}