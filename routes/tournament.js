var express = require('express');
var playerEntries = require('../playerEntries');
var game = require('../game');
var entrySorter = require('../logic/entrySorter');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var results = game.play();
    results.sort(function(){});
    res.render('tournament', {
        title: 'Tournament',
        results: results,
        entries: playerEntries.entries.sort(entrySorter.sortByWins)
    });
});

module.exports = router;
