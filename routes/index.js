var express = require('express');
var playerEntries = require('../playerEntries');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Rock Paper Boom!',
    entries: playerEntries.entries
  });
});

module.exports = router;
