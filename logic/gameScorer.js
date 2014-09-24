
exports.didPlayerOneWin = function (p1, p2) {
    if(p1.currentAction === 'D' && p1.boomSticks <= 0) {
        return false;
    }

    if(p2.currentAction === 'D' && p2.boomSticks <= 0) {
        return true;
    }

    if(p1.currentAction === 'R' && (p2.currentAction === 'P'|| p2.currentAction === 'D')) {
        return false;
    }

    if(p1.currentAction === 'P' && (p2.currentAction === 'S'|| p2.currentAction === 'D')) {
        return false;
    }

    if(p1.currentAction === 'S' && (p2.currentAction === 'R'|| p2.currentAction === 'D')) {
        return false;
    }

    if(p1.currentAction === 'D' && p2.currentAction === 'W') {
        return false;
    }

    if(p1.currentAction === 'W' && p2.currentAction !== 'D') {
        return false;
    } 

    if (!_isValidAction(p1.currentAction)) {
        return false;
    }
    
    return true;
};

var _isValidAction = function(action) {
    var validActions = {R: true, P: true, S: true, D: true, W: true};
    return validActions[action];
};

exports.isTie = function (playerOne, playerTwo) {
    if (playerOne.currentAction !== 'D' || playerTwo.currentAction !== 'D') {
        return playerOne.currentAction === playerTwo.currentAction;
    }

    return playerOne.boomSticks <= 0 
        && playerTwo.boomSticks <= 0;
}