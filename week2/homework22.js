var MongoClient = require('../node_modules/mongodb').MongoClient,
    request = require('../node_modules/request'); 

    
MongoClient.connect('mongodb://200.26.166.241:27017/weather', function(err,db) {   
    if (err) throw err;

    var state = '';

    var data = db.collection('data');
    var options = { 'sort' : [['State', 1], ['Temperature', -1]] };
    var cursor = data.find({}, {}, options);                    
    
    cursor.each(function(err,doc){
        if (err) throw err;
        if(doc===null){
            return db.close();
        }
        if (doc.State != state) {
            
            db.collection('data').update({"_id":doc._id},{'$set' : { 'month_high' : true }},function(err, updated) {
            if(err) throw err;
                console.dir("Successfully updated " + updated + " document!");
                });
            //console.dir(doc.State + ' ' + doc.Temperature);
            state = doc.State;
        }
        //console.dir(doc);
    });


});