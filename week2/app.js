var MongoClient = require('../node_modules/mongodb').MongoClient,
    request = require('../node_modules/request'); 

    
MongoClient.connect('mongodb://200.26.166.241:27017/students', function(err,db) {   //6,7,8 db= course; resto students
    if (err) throw err;
    
    
    
    
    //1.findOne
    /*
    var query = {'student_id':5};
    db.collection('grades').findOne(query, function(err,doc) {  
        if (err) throw err;       
        console.dir(doc);
        db.Close();
    });
    */
    
    //2.find .toArray
    /*
    var query = {'student_id':{$gte:10}};
    db.collection('grades').find(query).toArray(function(err,docs){
        if (err) throw err;
        console.dir(docs);
        db.close;
    });
    */
    
    //3.find .each cursors
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
    
    //4.field projection with find
    /*
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
    */
    
    //5.using operators in query
    /*
    var query = {'student_id':{$gte:10, $lt:20}};
    db.collection('grades').find(query).each(function(err,doc){
        if (err) throw err;
        
        if(doc===null){
            return db.close();
        }
        console.dir(doc.student_id + ' ' + doc.type);
    });
    */
    
    //6.importing data from a external source to mongodb
    /*
    request('http://www.reddit.com/.json',function (error, response, body) { //request('http://www.reddit.com/r/technology/.json',function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            var stories = obj.data.children.map(function (story) { return (story.data)}); //.map this function take only the data that we want in this case "story"
            
            db.collection('reddit_front').insert(stories, function(err,data){  //db.collection('reddit').insert(stories, function(err,data){
                if (err) throw err;
                console.dir(data);
                db.close();
            });
            
        }
    });
    */
    
    //7.using regex operator
    /*
    var query = {'title':{'$regex':'NSA'}};
    var projection = {'title':1, '_id':0};
    db.collection('reddit').find(query,projection).each(function (err,doc) {
        if(err) throw err;
        
        if (doc == null) {
            return db.close();
        }
        
        console.dir(doc.title);
    });
    */
    
    //8.using dot notation
    /*
    var query = {'media.oembed.type':'video'};
    var projection = {'media.oembed.url':1, '_id':0};
    db.collection('reddit_front').find(query,projection).each(function (err,doc) {
        if(err) throw err;
        
        if (doc === null) {
            return db.close();
        }
        
        console.dir(doc);
    });
    */
    
    //9.using sort, skip, limit
    /*
    var grades = db.collection('grades');
    var cursor = grades.find({});
    
    //option1
    //cursor.skip(1);
    //cursor.limit(4);
    //cursor.sort('student_id', 1); //sorting with one element
    //cursor.sort([['student_id', 1], ['score', -1]]); //sorting with multiple elements

    //option2
    var options = { 'skip' : 1,
                    'limit' : 4,
                    'sort' : [['student_id', 1], ['score', -1]] };
    var cursor = grades.find({}, {}, options);

    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc === null) {
            return db.close();
        }
        console.dir(doc);
    });
    */
    
    //10.inserting a document without _id field
    /*
    var doc = { 'student' : 'Calvin', 'age' : 6 };
    db.collection('students').insert(doc, function(err, inserted) {
        if(err) throw err;

        console.dir(inserted);  //inserted is a javascript object
        console.dir("Successfully inserted: " + JSON.stringify(inserted)); //JSON.stringify use to convert the js object into JSON notation

        return db.close();
    });
    */
    
    //11.inserting a document with _i field
    /*
    var doc = { '_id' : 'calvin', 'age' : 6 };
    db.collection('students').insert(doc, function(err, inserted) {
        if(err) { //throw err;
            console.log(err.message);
            return db.close();
        }; 

        console.dir("Successfully inserted: " + JSON.stringify(inserted));

        return db.close();
    });
    */
    
    //12.inserting multiples documents
    /*
    var docs = [ { 'student' : 'Calvin', 'age' : 6 },
                 { 'student' : 'Susie', 'age' : 7 } ];

    db.collection('students').insert(docs, function(err, inserted) {
        if(err) throw err;

        console.dir("Successfully inserted: " + JSON.stringify(inserted));

        return db.close();
    });
    */
    
    //13.update using replacement
    /*
    var query = { 'assignment' : 'hw3' };
    db.collection('students').findOne(query, function(err, doc) {
        if(err) throw err;
        if(!doc) {
            console.log('No documents for assignment ' + query.assignment + ' found!');
            return db.close();
        }

        query['_id'] = doc['_id']; //important when there are multiples users updating simultaneously 
        doc['date_returned'] = new Date();
        db.collection('students').update(query, doc, function(err, updated) {
            if(err) throw err;

            console.dir("Successfully updated " + updated + " document!");

            return db.close();
        });
    });
    */
    
    //14.updating with placement
    /*
    var query = { 'assignment' : 'hw1' };
    var operator = { '$set' : { 'date_returned' : new Date() } };

    db.collection('students').update(query, operator, function(err, updated) {
        if(err) throw err;

        console.dir("Successfully updated " + updated + " document!");

        return db.close();
    });
    */
    
    //15.updating multiples docs
    /*
    var query = { };
    var operator = { '$unset' : { 'date_returned' : '' } };
    var options = { 'multi' : true };

    db.collection('students').update(query, operator, options, function(err, updated) {
        if(err) throw err;

        console.dir("Successfully updated " + updated + " documents!");

        return db.close();
    });
    */
    
    //16.Upserting
    /*
    var query = { 'student' : 'Frank', 'assignment' : 'hw1' }; //when running an upsert if the document to be found doesn't exists the doc to be created is the query doc
    //var operator = { 'student' : 'Frank', 'assignment' : 'hw1', 'grade' : 100 };
    var operator = { '$set' : { 'date_returned' : new Date(), 'grade' : 100 } };
    var options = { 'upsert' : true };

    db.collection('students').update(query, operator, options, function(err, upserted) {
        if(err) throw err;

        console.dir("Successfully upserted " + upserted + " document!");

        return db.close();
    });
    */
    
    //17.Saving
    /*
    var query = { 'assignment' : 'hw2' };
    db.collection('students').findOne(query, function(err, doc) {
        if(err) throw err;

        doc['date_returned'] = new Date();

        db.collection('students').save(doc, function(err, saved) { //the save function retrieves the _id of the doc, if it doesn't have one insert the doc. if it does have one it runs a update replacemente with a query on _id
            if(err) throw err;

            console.dir("Successfully saved " + saved + " document!");

            return db.close();
        });
    });
    */
    
    //18.findAndModify
    /*
    var query = { 'name' : 'comments' };
    var sort = [];
    var operator = { '$inc' : { 'counter' : 1 } };
    var options = { 'new' : true };

    db.collection('counters').findAndModify(query, sort, operator, options, function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.log("No counter found for comments.");
        }
        else {
            console.log("Number of comments: " + doc.counter);
        }

        return db.close();
    });
    */
    
    //remove
    /*
    var query = { 'assignment' : 'hw3' };
    db.collection('students').remove(query, function(err, removed) {
        if(err) throw err;

        console.dir("Successfully updated " + removed + " documents!");

        return db.close();
    */
});
