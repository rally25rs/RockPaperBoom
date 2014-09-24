var _try = function (player, funcName, params) {
    try {
        return player.evaledCode[funcName].apply(player.evaledCode, params);
    } catch (ex) {
        console.log("Error from: " + player.name, ex);
    }
}

exports.start = function(player) {
	return _try(player, "start", []);
};

exports.play = function(player) {
	return _try(player, "play", []);
}

exports.result = function(player, arrayOfParams) {
	_try(player, "result", arrayOfParams);
}

exports.end = function(player) {
	_try(player, "end", []);
}