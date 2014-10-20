var expect = require("chai").expect;

describe('didPlayerOneWin', function() {
	var gameScorer = require('../../../logic/gameScorer');

	var playerOne;
	var playerTwo;

	beforeEach(function() {
		playerTwo = {};
		playerOne = {};
	});


  	it('should return false when invalid entry plays anything', function() {
  		playerOne.currentAction = 'XXX';
  		playerTwo.currentAction = 'R';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

	it('should return false when water plays scissors',function() {
  		playerOne.currentAction = 'W';
  		playerTwo.currentAction = 'S';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return false when paper plays scissors',function() {
  		playerOne.currentAction = 'P';
  		playerTwo.currentAction = 'S';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return true when rock plays scissors',function() {
  		playerOne.currentAction = 'R';
  		playerTwo.currentAction = 'S';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.true;
  	});


  	it('should return false when water balloon plays rock',function() {
  		playerOne.currentAction = 'W';
  		playerTwo.currentAction = 'R';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return true when paper plays rock',function() {
  		playerOne.currentAction = 'P';
  		playerTwo.currentAction = 'R';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.true;
  	});

  	it('should return false when scissors plays rock',function() {
  		playerOne.currentAction = 'S';
  		playerTwo.currentAction = 'R';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	  	it('should return false when water balloon plays paper',function() {
  		playerOne.currentAction = 'W';
  		playerTwo.currentAction = 'P';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return false when rock plays paper',function() {
  		playerOne.currentAction = 'R';
  		playerTwo.currentAction = 'P';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return true when scissors plays paper',function() {
  		playerOne.currentAction = 'S';
  		playerTwo.currentAction = 'P';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.true;
  	});

  	it('should return false when boom stick plays water balloon',function() {
  		playerOne.currentAction = 'D';
  		playerTwo.currentAction = 'W';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return true when water balloon plays boom stick',function() {
  		playerOne.currentAction = 'W';
  		playerTwo.currentAction = 'D';

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.true;
  	});

  	it('should return true when boom stick plays rock with ammo',function() {
  		playerOne.currentAction = 'D';
  		playerTwo.currentAction = 'R';

  		playerOne.boomStick = 1;

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.true;
  	});

  	it('should return false when boom stick plays rock with no ammo',function() {
  		playerOne.currentAction = 'D';
  		playerTwo.currentAction = 'R';

  		playerOne.boomSticks = 0;

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return false when rock plays boomstick with ammo',function() {
  		playerOne.currentAction = 'R';
  		playerTwo.currentAction = 'D';

  		playerTwo.boomSticks = 1;

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.false;
  	});

  	it('should return true when rock plays boomstick with no ammo',function() {
  		playerOne.currentAction = 'R';
  		playerTwo.currentAction = 'D';

  		playerTwo.boomSticks = 0;

    	var playerOneWins = gameScorer.didPlayerOneWin(playerOne, playerTwo);
    	expect(playerOneWins).to.be.true;
  	});
});