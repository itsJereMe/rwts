'use strict'

 require('dotenv').config();

//first we import our dependencies…
var express = require('express');
const path = require('path');
const fs = require("fs");
const http = require('http');
const https = require('https');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');
var Questions = require('./model/questions');
var Stars = require('./model/stars');
var Users = require('./model/users');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 80;

var env = process.env;
//db config
var user = env.MDB_USER;
var pass = env.MDB_PASS;
var database = env.MDB_DBASE;
//console.log(user);
mongoose.connect('mongodb+srv://' + user + ':' + pass + '@cloudcluster-bs39f.azure.mongodb.net/' + database + '?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true});

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//adding the /comments route to our /api router
router.route('/admin/star')
    .get(function(req, res) {

      //looks at our Comment Schema
      Stars.find(function(err, stars) {
          if (err)
          res.send(err);
          
          //responds with a json object of our database comments.
          res.json(stars)
      });
    })

    //post new comment to the database
    .post(function(req, res) {
      var player = new Stars();
      player.player = req.body.player;
      // console.log(comment);
      player.save(function(err) {
          if (err) 
          res.send(err);

          res.json({ message: 'Star successfully added!' });
      });
    });

router.route('/admin/star/:id')
    .delete(function(req, res) {
      Stars.remove({_id: req.params.id}, function(err) {
        if (err)
        res.send(err);

        res.json({ message: 'Star deleted!' });

      });
    });


router.route('/admin/comment')
    .delete(function(req, res) {
      Comment.deleteMany({}).exec(function(err, comment) {
        if (err)
        res.send(err);
        
        //responds with a json object of our database comments.
        res.json({Message:"Comments emptied"})
      });
    });

//adding the /comments route to our /api router
router.route('/admin/question')
    //retrieve all comments from the database
    .get(function(req, res) {

      //looks at our Comment Schema
      Questions.find(function(err, question) {
          if (err)
          res.send(err);
          
          //responds with a json object of our database comments.
          res.json(question)
      });
    })
    
    //post new comment to the database
    .post(function(req, res) {
        var question = new Questions();

        // body parser lets us use the req.body
        question.question = req.body.Question;
        question.questionNr = req.body.QuestionNr;
        // console.log(comment);
        question.save(function(err) {
            if (err) 
            res.send(err);

            res.json({ message: 'Question successfully added!' });
        });
    });

router.route('/admin/question/:questionNr')
    .get(function(req, res) {
      Questions.find({questionNr: req.params.questionNr}, function(err, question) {
        if (err)
        res.send(err);
        
        //responds with a json object of our database comments.
        res.json(question)
      });
    });

//adding the /comments route to our /api router
router.route('/admin/all')
    //retrieve all comments from the database
    .get(function(req, res) {

        //looks at our Comment Schema
        Comment.aggregate([
            {
            $lookup: {
                from: "users", // collection name in db
                localField: "playerId",
                foreignField: "_id",
                as: "user"
            }
        }]).exec(function(err, comments) {
            if (err)
            res.send(err);
            
            //responds with a json object of our database comments.
            res.json(comments)
        });
    })

router.route('/admin/:question')
    //retrieve all comments from the database
    .get(function(req, res) {
//
        //looks at our Comment Schema
        Comment.aggregate([
            {$match: {question: Number(req.params.question)}},
            {
            $lookup: {
                from: "users", // collection name in db
                localField: "playerId",
                foreignField: "_id",
                as: "user"
            }
        }]).exec(function(err, comments) {
            if (err)
            res.send(err);
            
            //responds with a json object of our database comments.
            res.json(comments);
        });
    })

router.route('/admin/results/:qid')
    //retrieve all comments from the database
    .get(function(req, res) {

        //looks at our Comment Schema
        var query = Comment.find({});
        query.where('question').equals(req.params.qid);
        query.exec(function(err, comments) {
            if (err)
            res.send(err);
            
            //responds with a json object of our database comments.
            res.json(comments)
        });
    });

router.route('/admin/:questions/:id')
    //retrieve all comments from the database
    .get(function(req, res) {

        //looks at our Comment Schema
        Comment.aggregate([
            {$match: {question: Number(req.params.questions)}},
            {$match: {playerId: new mongoose.Types.ObjectId(req.params.id)}},
            {
            $lookup: {
                from: "users", // collection name in db
                localField: "playerId",
                foreignField: "_id",
                as: "user"
            }
        }]).exec(function(err, comments) {
            if (err)
            res.send(err);
            
            //responds with a json object of our database comments.
            res.json(comments)
        });
    });


router.route('/users') 
    //post new comment to the database
    .post(function(req, res) {
        var user = new Users();

        // body parser lets us use the req.body
        user.name = req.body.name;
        // console.log(comment);
        user.save(function(err, result) {
            if (err) 
            res.send(err);

            res.json({ message: 'Question successfully added!', data: result });
        });
    });

//adding the /comments route to our /api router
router.route('/comments')

    //retrieve all comments from the database
    .get(function(req, res) {

        //looks at our Comment Schema
        Comment.find(function(err, comments) {
            if (err)
            res.send(err);
            
            //responds with a json object of our database comments.
            res.json(comments)
        });
    })
    
    //post new comment to the database
    .post(function(req, res, next) {
        var comment = new Comment();
        // console.log(req);
        // body parser lets us use the req.body
        comment.playerId = req.body.playerId;
        comment.answers = req.body.answers;
        comment.question = req.body.question;
        // console.log(comment);
        comment.save().then(product => {
            res.json({ message: 'Comment successfully added!' });
         }).catch(err => {
            next(err);
         });
    });

//Adding a route to a specific comment based on the database ID
router.route('/comments/:comment_id')
    //The put method gives us the chance to update our comment based on 
    //the ID passed to the route
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
            res.send(err);

            //setting the new author and text to whatever was changed. If 
            //nothing was changed we will not alter the field.
            (req.body.answers) ? comment.answers = req.body.answers : null;
            (req.body.player) ? comment.player = req.body.player : null;

            //save comment
            comment.save(function(err) {
                if (err)
                res.send(err);
                res.json({ message: 'Comment has been updated' });
            });
        });
    })

    //delete method for removing a comment from our database
    .delete(function(req, res) {
        //selects the comment by its ID, then removes it.
        Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
            if (err)
            res.send(err);
            res.json({ message: 'Comment has been deleted' })
        })
    });

//Use our router configuration when we call /api
app.use('/api', router);
app.use('/static', express.static(__dirname + '/build/static'));
app.use('/img', express.static(__dirname + '/build/img'));
app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  })

//starts the server and listens for requests
http.createServer(app).listen(port, function() {
    console.log(`api running on port ${port}`);
});

/* var options = {
    key: fs.readFileSync(env.KEY_PATH),
    cert: fs.readFileSync(env.CERT_PATH),
    ca: fs.readFileSync(env.CA_PATH)
  }; */

/* https.createServer(options, app).listen(443, function() {
    console.log(`api running on port 443`);
}); */