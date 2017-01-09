var express = require('express');
var playerEntries = require('../playerEntries');
var router = express.Router();

var _testPlayerCode = function (code) {
  var success = true;

  try {
    var bot = eval('new Object(' + code + ')');
    bot.start();
    bot.play();
    bot.result('R', 'tie');
    bot.end();
  } catch (ex) {
    success = false;
  }

  return success;
};


router.get('/', function(req, res) {
  res.render('play', { title: 'Play' });
});

router.post('/', function(req, res) {
    var name = req.param('name');
    var code = req.param('code');

    var isCodeValid = _testPlayerCode(code);
    if (!isCodeValid) {
      res.render('play', { title: 'Play', error: "Code Fails" });
      return;
    }
    var found = false;
    for(var i = 0; i < playerEntries.entries.length; i++)
    {
        if (playerEntries.entries[i].name == name) {
            playerEntries.entries[i].code = code;
            found = true;
        }
    }

    if (!found) {
        playerEntries.entries.push({
            name: name,
            code: code,
            wins: 0,
            losses: 0,
            ties: 0,
        });
    }
    res.redirect('/');
});

module.exports = router;
