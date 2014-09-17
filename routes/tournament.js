var express = require('express');
var playerEntries = require('../playerEntries');
var game = require('../game');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var results = game.play();
    res.render('tournament', {
        title: 'Tournament',
        results: results
    });
});

module.exports = router;
