var _isValidAction = function(action) {
    var validActions = {R: true, P: true, S: true, D: true, W: true};
    return validActions[action];
};

exports.didPlayerOneWin = function (p1action, p2action) {
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
}

