var express = require('express');
var router = express.Router();
var db = require('../config/database')

var goalCollection = db.get('goal');

/* GET users listing. */
router.get('/', function(req, res, next) {
  goalCollection.find({}, function(err, goals){
    if(err) throw err;
    res.json(goals);
  });
});

router.post('/', function(req, res, next){
  goalCollection.insert(req.body, function(err, data){
    if(err) throw err;
    res.json(data);
  });
});



module.exports = router;
