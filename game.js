var playerEntries = require('./playerEntries');

var _playMatch = function (p1, p2) {
    var p1code = eval('new Object(' + p1.code + ')');
    var p2code = eval('new Object(' + p2.code + ')');
    var p1action, p2action;
    var ties = 0;
    var result = {
        p1: p1.name,
        p2: p2.name,
        p1wins: 0,
        p2wins: 0
    };

    p1code.start();
    p2code.start();

    for(var i = 0; i < 100; i++) {
        p1action = p1code.play();
        p2action = p2code.play();

        if(_isTie(p1action, p2action)) {
            ties++;
        } else {
            if(_didP1Win(p1action, p2action)) {
                result.p1wins += (1 + ties);
            } else {
                result.p2wins += (1 + ties);
            }
            ties = 0;
        }
 
        p1code.result(p2action);
        p2code.result(p1action);
    }

    p1code.end();
    p2code.end();

    return result;
};

var _isTie = function (p1action, p2action) {
    return p1action === p2action;
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
    if(p1action === 'W' && (p2action === 'P'|| p2action === 'D')) {
        return false;
    }
    return true;
};

exports.play = function () {
    var numPlayers = playerEntries.entries.length;
    var matchNum = 0, playerNum = 0;
    var results = [];

    for(playerNum = 0; playerNum < numPlayers; playerNum++) {
        for(matchNum = playerNum+1; matchNum < numPlayers; matchNum++) {
            results.push(_playMatch(playerEntries.entries[playerNum], playerEntries.entries[matchNum]));
        }
    }

    return results;
};
