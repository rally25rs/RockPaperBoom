var express = require('express');
var playerEntries = require('../playerEntries');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('play', { title: 'Play' });
});

router.post('/', function(req, res) {
    var name = req.param('name');
    var code = req.param('code');

    playerEntries.entries.push({
        name: name,
        code: code
    });

    res.redirect('/');
});

module.exports = router;
