/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// variables defined in the global scope
var scores, roundScore, activePlayer, dice, gamePlaying, rolledSix, maxScore;

init();


document.querySelector('.btn-roll').addEventListener('click', function () {
    // if the game is in play, run this game.
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // checks if a six was rolled twice in a row.

        if (rolledSix && (dice === 6 || dice2 === 6)) {
            scores[activePlayer] = 0;
            nextPlayer();
        }
        else if (dice === 6) {
            rolledSix = true;
        }
        else {
            rolledSix = false;
        }

        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        if (dice !== 1 && dice2 !== 1) {
            // Add Score
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        // scores[activePlayer] = scores[activePlayer] + roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    rolledSix = false;
    // Next Player

    // if activePlayer === 0 then activePlayer = 1, else activePlayer = 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // remove and adding a class to a different element
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    // since the dice made it to one. We not remove the dice image so that the next player does not have a dice showing
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';




}

function init() {
    console.log("New Game Clicked");
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    rolledSix = false;
    // Set the default max score
    maxScore = 10;
    document.querySelector('#maxScore').textContent = maxScore.toString();
    document.querySelector('#score').textContent = "10";

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Remove the winner header abd replace with origional text.
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove the winners!
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Setting the active player but removing the active
    // class so that two duplicates will be made at the start of the game
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Set the initial active player
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-new').addEventListener('click', init);
}

function setMaxScore() {
    var score = document.getElementById("score").value;
    maxScore = score;
    document.querySelector('#maxScore').textContent = maxScore.toString();
    document.querySelector('#score').textContent = "10";
}


// console.log(dice);

// Select Element from page based on ID then use textContent to give value of dice
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// querySelector can also be used as a reader and a writer
// var x = document.querySelector('#score-0').textContent;
// console.log(x);
// We can also change the CSS with querySelector

