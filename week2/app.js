var MongoClient = require('../node_modules/mongodb').MongoClient; //mongodb driver for node.js
    
MongoClient.connect('mongodb://200.26.166.241:27017/students', function(err,db) {
    if (err) throw err;
    
    
    
    
    //findOne
    /*
    var query = {'student_id':5};
    db.collection('grades').findOne(query, function(err,doc) {  
        if (err) throw err;       
        console.dir(doc);
        db.Close();
    });
    */
    
    //find .toArray
    /*
    var query = {'student_id':{$gte:10}};
    db.collection('grades').find(query).toArray(function(err,docs){
        if (err) throw err;
        console.dir(docs);
        db.close;
    });
    */
    
    //find .each cursors
    /*
    var query = {'student_id':{$gte:60}};
    var cursor = db.collection('grades').find(query);
    cursor.each(function(err,doc){
        if (err) throw err;
        if(doc===null){
            return db.close();
        }
        console.dir(doc.student_id + ' ' + doc.type);
    });
    */
    
    //field projection with find
    var query = {'student_id':{$gte:10}};
    var projection = {'student_id':1,'_id':0};
    db.collection('grades').find(query,projection).toArray(function(err,docs){
        if (err) throw err;
        
        docs.forEach(function (doc){
            console.dir(doc);
            console.dir(doc.student_id);
        });
        db.close;
    });
     

});
