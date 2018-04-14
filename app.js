/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDiceOne, lastDiceTwo, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    // The gamePlaying variable is already true or false, so we don't need anything else
    if (gamePlaying) {
        // 1. Random number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var secondDice = Math.floor(Math.random() * 6) + 1;
        // 2. Display the result

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + diceOne + '.png';
        document.getElementById('dice-2').src = 'dice-' + secondDice + '.png';

        if (diceOne === 6 && lastDice === 6 && lastDiceTwo === 6) {
            // Player looses his entire score and gives a turn to the other
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        // 3. Update the round score IF the rolled number was NOT a 1
        else if (diceOne !== 1 && secondDice !== 1) {
            //Add score
            roundScore += diceOne + secondDice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        lastDice = diceOne;
        lastDiceTwo = secondDice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {

        // Add current score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // In this statement we detect if a player wins a game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false; // end of the game. We have a winner, therefore we don't need the game to continue anymore.
        } else {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary operator
    // if activePlayer is 0, then active player should be one, else activePlayer should be 0

    /**** if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    } ****/
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

// When someone clicks "New Game" button, then please pass the init function into this EventListener function;
// Otherwise if we write it like that "init()", we call it immediately and we don't want that to happen.
// We just want to tell this EventListener that 'hey, when someone clicks this button, then please call the init function for me'.

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-new').addEventListener('click', setWinningScore);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    winScore = 100;
    //document.querySelector('#current-' + activePlayer).textContent = dice;   //this is a setter, because we set a value
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
    //var x = document.querySelector('#score-0').textContent;  //reading from html and storing to variable // also this is a getter because we get a value
    //console.log(x);

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0'; // Works only with id's and it is faster than querySelector.
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // We remove active and winner classes, just to be sure that everything is clean before the start of a new game. 
    // And then we add the active class to the first player
    document.querySelector('.player-0-panel').classList.add('active');
}


function setWinningScore() {
    var x = document.getElementById('winscore').value;
    var regex = /^[0-9]+$/;

    if (x.match(regex) && x > 0) {
            winScore = x;    
    } else {
        winScore = 100;
        alert("Must input numbers or a positive value");
    }
}