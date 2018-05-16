var playerEntries = require('./playerEntries');
var gameScorer = require('./logic/gameScorer');
var playerActions = require('./logic/playerActions');

var MAX_BOOM_STICKS = 100;

var _getPlayerCodeValue = function (codeToRun) {
    try {
        return eval('new Object(' + codeToRun + ')');
    } catch (ex) {
        return {
          start: function () {
          },
         
          end: function () {
          },
         
          play: function () {
            return "W";
          },
         
          result: function (opponentPlayed) {
          }
        };
    }
}

var _getP2Result = function(p1result) {
    if(p1result === "won") {
        return "loss";
    } else if(p1result === "loss") {
        return "win";
    }
    return "tie";
};

var _playMatch = function (p1, p2) {
    p2.evaledCode = _getPlayerCodeValue(p2.code);
    p1.evaledCode = _getPlayerCodeValue(p1.code);

    p1.boomSticks = MAX_BOOM_STICKS;
    p2.boomSticks = MAX_BOOM_STICKS;

    var ties = 0;
    var p1result = "loss";
    var p1Won = false;
    var result = {
        p1: p1.name,
        p2: p2.name,
        p1wins: 0,
        p2wins: 0
    };

    playerActions.start(p1);
    playerActions.start(p2);

    for(var i = 0; i < 1000; i++) {
        p1.currentAction = playerActions.play(p1);
        p2.currentAction = playerActions.play(p2);

        if(gameScorer.isTie(p1, p2)) {
            p1result = "tie";
            ties++;
        } else {
            p1Won = gameScorer.didPlayerOneWin(p1, p2);
            if(p1Won) {
                p1result = "win";
                result.p1wins += (1 + ties);
            } else {
                p1result = "loss";
                result.p2wins += (1 + ties);
            }
            ties = 0;
        }

        p1.boomSticks = (p1.currentAction === 'D') ? p1.boomSticks -1 : p1.boomSticks;
        p2.boomSticks = (p2.currentAction === 'D') ? p2.boomSticks -1 : p2.boomSticks;

        playerActions.result(p1, [p2.currentAction, p1result]);
        playerActions.result(p2, [p1.currentAction, _getP2Result(p1result)]);
    }

    playerActions.end(p1);
    playerActions.end(p2);

    if(result.p1wins > result.p2wins) {
        p1.wins++;
        p2.losses++;
    } else if (result.p1wins < result.p2wins) {
        p1.losses++;
        p2.wins++;
    } else {
        p1.ties++;
        p2.ties++;
    }

    return result;
};

var _clearPlayerRecords = function () {
    var entry;
    for(var i = 0; i < playerEntries.entries.length; i++) {
        entry = playerEntries.entries[i];
        entry.wins = 0;
        entry.losses = 0;
        entry.ties = 0;
    }
};

exports.play = function () {
    var numPlayers = playerEntries.entries.length;
    var matchNum = 0, playerNum = 0;
    var results = [];

    _clearPlayerRecords();

    for(playerNum = 0; playerNum < numPlayers; playerNum++) {
        for(matchNum = playerNum+1; matchNum < numPlayers; matchNum++) {
            results.push(_playMatch(playerEntries.entries[playerNum], playerEntries.entries[matchNum]));
        }
    }

    return results;
};
