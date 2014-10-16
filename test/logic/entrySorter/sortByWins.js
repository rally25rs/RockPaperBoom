var expect = require("chai").expect;

describe('sortByWins', function() {
    var entrySorter = require('../../../logic/entrySorter');

    var playerOne;
    var playerTwo;
    var playerThree;

    beforeEach(function() {
        playerTwo = {};
        playerOne = {};
        playerThree = {};
    });

    it('should sort 1 win above 0 wins',function() {
        playerOne.wins = 0;
        playerTwo.wins = 1;
        playerThree.wins = 0;

        var theThing = [playerOne, playerTwo, playerThree].sort(entrySorter.sortByWins)
        expect(theThing[0]).to.equal(playerTwo);
    });

    it('should sort 9 win above 6 and 3 wins',function() {
        playerOne.wins = 6;
        playerTwo.wins = 9;
        playerThree.wins = 3;

        var theThing = [playerOne, playerTwo, playerThree].sort(entrySorter.sortByWins)
        expect(theThing[0]).to.equal(playerTwo);
        expect(theThing[1]).to.equal(playerOne);
        expect(theThing[2]).to.equal(playerThree);
    });

});