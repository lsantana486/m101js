var express = require('../node_modules/express'),
    app = express(),
    cons = require('../node_modules/consolidate'),
    crypto = require('../node_modules/crypto'),
    MongoClient = require('../node_modules/mongodb').MongoClient;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://' + process.env.IP + ':27017/m101', function(err, db) {
    if(err) throw err;

    app.get('/', function(req, res){

        var algorithm = 'aes256';
        var encrypted_message = 'f36731a12e6130f0ed0bccbfd9bd6ebd';

        db.collection('hw1_3').findOne(function(err, doc) {
            if(err) throw err;

            if (!doc) {
                console.dir("No document found");
                return db.close();
            }

            var decipher = crypto.createDecipher(algorithm, doc['_id']);
            var decrypted = decipher.update(encrypted_message, 'hex', 'utf8') + decipher.final('utf8');
            return res.render('hw1_3', { "name" : decrypted });
        });
    });

    app.get('*', function(req, res){
        return res.send('Page Not Found', 404);
    });

    app.listen(process.env.PORT);
    console.log('Express server started');
});
