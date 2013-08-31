
var MongoClient = require('../node_modules/mongodb').MongoClient,
    request = require('../node_modules/request'); 

    
MongoClient.connect('mongodb://200.26.166.241:27017/school', function(err,db) {   
    if (err) throw err;

   // var state = '';

    var data = db.collection('students');
    
    var options = { 'sort' : [['_id', 1]] };
    var cursor = data.find({}, {}, options);                    
    var elem;
    var homeA,homeB,indice,rm;
    cursor.each(function(err,doc){
        if (err) throw err;
        if(doc===null){
            return db.close();
        }
        elem = '';
        homeA = 100;
        homeB = 0;
        indice = 0;
        for (var i=0; i < doc.scores.length; i++) {
            elem = doc.scores[i];
            if (elem.type == 'homework') {
                homeB = elem.score
                if (homeB<homeA){
                    homeA=homeB;
                    indice = i;
                }
            }
        }
        console.dir(homeA + ' ' + indice);
        console.dir(doc.scores);
        rm = doc.scores.splice(indice,1);
        console.dir(rm);
        console.dir(doc.scores);
        
        data.update({'_id':doc._id}, { '$set' : { 'scores' : doc.scores}}, function(err, updated) {
        if(err) throw err;
        console.dir("Successfully updated " + updated + " document!");
        });
        
    });
    //return db.close();

});