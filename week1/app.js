var http = require('http'), //for basic http server
    express = require('../node_modules/express'), //for express module to handle http server
    app = express(), //for express module to handle http server
    cons = require('../node_modules/consolidate'), //interface for express module to use template servers
    MongoClient = require('../node_modules/mongodb').MongoClient, //mongodb driver for node.js
    Server = require('../node_modules/mongodb').Server; //using the module server of the mongodb driver

//---------------------------------------------------------------------------------

//using a basic http library to create a web server
/* 
var server = http.createServer( function(request,response) {
    response.writeHead(200, {"Content-type":"text/plain"});
    response.end("Hello Wolrd");

});

server.listen(process.env.PORT);
*/
//---------------------------------------------------------------------------------

//using the mongodb driver to connect
//Open the connection to the server
/*
MongoClient.connect('mongodb://200.26.166.241:27017/test', function(err,db) {
    if (err) throw err;
    
    //Find one document in our collection
    db.collection('coll').findOne({}, function(err,doc) {
       
       if (err) throw err;
       
       //Print result
       console.dir(doc);

        //Close DB
        db.Close();
        
    });
    //Declare success
    console.dir("Called findOne");
});
*/
//---------------------------------------------------------------------------------

//using express module
//similar to spark in java 
/*
app.get('/',function(req,res){
    res.send("Hellos, World!");
    
});

app.get('*', function(res, res){
    res.send("Page not found",404);
});

app.listen(process.env.PORT);
console.log("Express server started");
*/
//---------------------------------------------------------------------------------

//using express with consolidate and swig template server
/*
app.engine('html', cons.swig); //create a swig template server to work with express using consolidate as an interface between them
app.set('view engine', 'html'); //setting html as a template
app.set('views', __dirname + "/views"); //setting the path of the template html document
app.get('/',function(req,res){
    res.render('hello',{'name':'Swig'});
    
});

app.get('*', function(res, res){
    res.send("Page not found",404);
});

app.listen(process.env.PORT);
console.log("Express server started");
*/
//---------------------------------------------------------------------------------

//using express, consolidate, swig and the mongo driver

app.engine('html', cons.swig); 
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

var mongoclient = new MongoClient (new Server ("200.26.166.241",27017,{'native_parser':true})); //setting our connection to MongoDB
var db = mongoclient.db('test'); //setting the DB to use

app.get('/',function(req,res){
    db.collection('people').findOne({},function(err,doc){
        //setting the collection a creating the query
        res.render('hello',doc);
    });

});

app.get('*', function(res, res){
    res.send("Page not found",404);
});

mongoclient.open(function(err,mongoclient){ //opening the connection to mongoDB and after it is connected we start listening
    if (err) throw err;
    
    app.listen(process.env.PORT);
    console.log("Express server started");
});

//


    
    
    
    
    
    