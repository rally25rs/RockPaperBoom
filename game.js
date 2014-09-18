var playerEntries = require('./playerEntries');

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

var _try = function (entry, code, funcName, params) {
    try {
        code[funcName].apply(code, params);
    } catch (ex) {
        console.log("Error from: " + entry.name, ex);
    }
}

var _playMatch = function (p1, p2) {
    var p1code = _getPlayerCodeValue(p1.code);
    var p2code = _getPlayerCodeValue(p2.code);
    var p1action, p2action;
    var ties = 0;
    var p1result = "loss";
    var result = {
        p1: p1.name,
        p2: p2.name,
        p1wins: 0,
        p2wins: 0
    };

    _try(p1, p1code, "start", []);
    _try(p2, p2code, "start", []);

    for(var i = 0; i < 1000; i++) {
        p1action = _try(p1, p1code, "play", []);
        p2action = _try(p2, p2code, "play", []);

        if(_isTie(p1action, p2action)) {
            p1result = "tie";
            ties++;
        } else {
            p1Won = _didP1Win(p1action, p2action);
            if(p1Won) {
                p1result = "win";
                result.p1wins += (1 + ties);
            } else {
                p1result = "loss";
                result.p2wins += (1 + ties);
            }
            ties = 0;
        }
 
        _try(p1, p1code, "result", [p2action, p1result]);
        _try(p2, p2code, "result", [p1action, _getP2Result(p1result)]);
    }

    _try(p1, p1code, "end", []);
    _try(p2, p2code, "end", []);

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

var _isTie = function (p1action, p2action) {
    return p1action === p2action;
};

var _isValidAction = function(action) {
    var validActions = {R: true, P: true, S: true, D: true, W: true};
    return validActions[action];
};

var _didP1Win = function (p1action, p2action) {
    if(p1action === 'R' && (p2action === 'P'|| p2action === 'D')) {
        return false;
    }
    if(p1action === 'P' && (p2action === 'S'|| p2action === 'D')) {
        return false;
    }
    if(p1action === 'S' && (p2action === 'R'|| p2action === 'D')) {
        return false;
    }
    if(p1action === 'D' && p2action === 'W') {
        return false;
    }
    if(p1action === 'W' && p2action !== 'D') {
        return false;
    } if (!_isValidAction(p1action)) {
        return false;
    }
    return true;
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
