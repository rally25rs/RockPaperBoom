var expect = require("chai").expect;

describe('didPlayerOneWin', function() {
	var gameScorer = require('../logic/gameScorer');

  	it('should return true when rock plays scissors.',function() {
    	var playerOneWins = gameScorer.didPlayerOneWin('R', 'S');
    	expect(playerOneWins).to.be.true;
  	});

});