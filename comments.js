// Create web server 
// for comment related functions

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');

// Create a new comment
router.post('/new', function(req, res){
  var comment = new Comment(req.body);
  comment.save(function(err){
    if (err) throw err;
    res.redirect('/post/' + comment.post);
  });
});

// Edit an existing comment
router.post('/edit/:id', function(req, res){
  Comment.findById(req.params.id, function(err, comment){
    if (err) throw err;
    comment.text = req.body.text;
    comment.save(function(err){
      if (err) throw err;
      res.redirect('/post/' + comment.post);
    });
  });
});

// Delete an existing comment
router.get('/delete/:id', function(req, res){
  Comment.findById(req.params.id, function(err, comment){
    if (err) throw err;
    comment.remove(function(err){
      if (err) throw err;
      res.redirect('/post/' + comment.post);
    });
  });
});

module.exports = router;