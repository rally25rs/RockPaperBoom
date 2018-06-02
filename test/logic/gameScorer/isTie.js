var expect = require("chai").expect;

describe('isTie', function() {
	var gameScorer = require('../../../logic/gameScorer');

	var playerOne;
	var playerTwo;

	beforeEach(function() {
		playerTwo = {};
		playerOne = {};
	});

	it('should return true when both players choose an invalid action',function() {
		playerOne.currentAction = '';
		playerTwo.currentAction = '';

	  var isTie = gameScorer.isTie(playerOne, playerTwo);
	  expect(isTie).to.be.true;
	});

  	it('should return true when both players throw rock',function() {
  		playerOne.currentAction = 'R';
  		playerTwo.currentAction = 'R';

    	var isTie = gameScorer.isTie(playerOne, playerTwo);
    	expect(isTie).to.be.true;
  	});

  	it('should return false when player one throws a boom stick but is out of them',function() {
  		playerOne.currentAction = 'D';
  		playerTwo.currentAction = 'D';

  		playerOne.boomSticks = 0;
  		playerTwo.boomSticks = 1;

    	var isTie = gameScorer.isTie(playerOne, playerTwo);
    	expect(isTie).to.be.false;
  	});

  	it('should return false when player two throws a boom stick but is out of them',function() {
		playerOne.currentAction = 'D';
  		playerTwo.currentAction = 'D';
  		
  		playerOne.boomSticks = 1;
  		playerTwo.boomSticks = 0;

    	var isTie = gameScorer.isTie(playerOne, playerTwo);
    	expect(isTie).to.be.false;
  	});

  	it('should return true when both players throw boom sticks but are out of them',function() {
		playerOne.currentAction = 'D';
  		playerTwo.currentAction = 'D';
  		
  		playerOne.boomSticks = 0;
  		playerTwo.boomSticks = 0;

    	var isTie = gameScorer.isTie(playerOne, playerTwo);
    	expect(isTie).to.be.true;
  	});

  	it('should return true when both players throw boom sticks and have them',function() {
		playerOne.currentAction = 'D';
  		playerTwo.currentAction = 'D';
  		
  		playerOne.boomSticks = 1;
  		playerTwo.boomSticks = 1;

    	var isTie = gameScorer.isTie(playerOne, playerTwo);
    	expect(isTie).to.be.true;
  	});

});