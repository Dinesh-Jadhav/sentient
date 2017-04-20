    var express = require('express');
    var app = express(); // create our app w/ express
    var router = express.Router();
    var mongoose = require('mongodb');
    var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var crypto = require('crypto');
    var session = require('express-session');
    var formidable = require("formidable");
    var fs = require('fs-extra');
    var randomstring = require("randomstring");
    var Q = require('q');
    var step = require('step');
    var slug = require('slug');
    var moment = require("moment");
    var async = require('async');
    var db = require('./config/db');
    var assert = require('assert');

    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
    app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
    app.use(session({secret: 'secret',saveUninitialized: true,resave: true}));
/*    var pool = mongoose.connect(db.localUrl).then(() =>  console.log('connection succesful')).catch((err) => console.error(err));
*/
	mongoose.connect('mongodb://localhost:27017/sentient', function(err,database) {
    if(err) { 
        console.error(err);
     }
    db = database; // once connected, assign the connection to the global variable
    });

     app.post('/login',function(req,res){
     sess=req.session;
     var username= req.body.userName;
     var password = req.body.password;
     var result = {};
     var resultArray = [];

     if((username!=null) &&(password!=null)){
         var cursor =db.collection('admin').find({"email":username,"password":password});
         cursor.forEach(function(doc, err) {
         assert.equal(null, err);
         result=doc;
     }, function() {
            if ((result==null)||(Object.keys(result).length === 0)){
             console.log("no user found");
             result.error="Please Try Again";
             res.send(JSON.stringify(result));
             return;
            }
            else {
                sess.userID = result["_id"];
                sess.userPrivilege = 1;
                sess.userLevel = "admin";
                result.success = result;
                result.success = "admin login successfully";
                res.send(JSON.stringify(result));
                return;
                    }
            });
        }
    });

     app.get('/authentication/:access',function(req,res){
          var userLevel = req.params.access;
          sess=req.session;
          var result = {};
         if(typeof sess.userID !=='undefined' && sess.userID!='' && sess.userLevel==userLevel){
             result.status = 'success';
             res.setHeader('Content-Type', 'application/json');
             res.send(JSON.stringify(result));
         }else{
             result.status = 'fail';
             res.setHeader('Content-Type', 'application/json');
             res.send(JSON.stringify(result));
         }
    });


//     app.get('/ticker_list',function(req,res))


app.get('/ticker_list', function(req, res, next) {
  var resultArray = [];
    var cursor = db.collection('ticker_list').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.send( resultArray);      
    });
});


router.post('/addTicker', function(req, res, next) {
    console.log("------------------------------------------------------------")
    console.log("inside addTicker ")
    console.log("------------------------------------------------------------")
    var item = {
        ticker_name: req.body.ticker_name
        };
      if (item!=null){
        db.collection('ticker_list').insertOne(item, function(err, result) {
          assert.equal(null, err);
          console.log('ticker inserted');
          db.close();
        });
}});






    app.get('/logout',function(req,res){
        var result = {};
        sess = req.session;
        sess.userID ='' ;
        sess.userPrivilege = 0;
        sess.userLevel = '';
        result.success = 'Logged out successfully';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result)); 
    });

    app.use(router);
    app.listen(process.env.PORT || 2000);

    console.log("App listening on port 2000");

