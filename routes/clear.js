var express = require('express');
var playerEntries = require('../playerEntries');
var router = express.Router();

router.get('/', function(req, res) {
    playerEntries.entries = [];
    res.redirect('/');
    //res.render('index', { title: 'Play' });
});

module.exports = router;
