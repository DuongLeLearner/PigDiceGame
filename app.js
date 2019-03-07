/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer; 
var dice, dice2, diceTotal, winScore, gamePlaying;
var scoresByNumer;
iniDisplay();

function iniDisplay() {
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 0';
    document.getElementById('name-1').textContent = 'Player 1';

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('pigGame').style.display = 'none';

    document.getElementById('WinningScore').disabled = false;
    document.getElementById('WinningScore').focus();
    document.getElementById('WinningScore').select();

    gamePlaying = true;
    sixTwice = 0;
    scores = [0,0];
    scoresByNumer = [0,0,0,0,0,0];
    roundScore = 0;
    activePlayer = 0;
    diceTotal = 0;
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) { 
        //Roll dice to get the number
        dice = 0;
        dice = (Math.floor(Math.random() * 6) + 1);
        dice2 = 0;
        dice2 = (Math.floor(Math.random() * 6) + 1);

        //Store the numbers of presence of dice number
        scoresByNumer[dice-1] += 1;
        scoresByNumer[dice2-1] += 1;
        
        //Change UI of dice
        changeDice();

        //If you got 2 number 6 in a row, you will loose your ENTIRE scores
        if (scoresByNumer[5] == 2) {
            document.querySelector('#score-'+ activePlayer).textContent = 0;
            scores[activePlayer] = 0;
            nextPlayer();
        }
    }
});

function changeDice() {
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = '';
    diceDOM.src = "dice-" + dice + ".png";

    var diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = '';
    diceDOM2.src = "dice-" + dice2 + ".png";

    if (dice !== 1 && dice2 !== 1) {
        diceTotal += (dice + dice2);
        document.querySelector('#current-' + activePlayer).textContent = parseInt(diceTotal);
    } else {
        nextPlayer();
    }
}

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        //add Current score to GLOBAL score
        scores[activePlayer] += diceTotal;

        //update UI
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        
        //check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } else {
            //Change player
            nextPlayer();
        }    
    }
});

function nextPlayer() {
    scoresByNumer = [0,0,0,0,0,0];
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    diceTotal = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', function(){
   iniDisplay(); 
});

document.getElementById('WinningScore').addEventListener('keyup', function(event){ 
    if (event.keyCode == 13) {
        winScore = document.getElementById('WinningScore').value;
        document.getElementById('WinningScore').disabled = true;
        document.getElementById('pigGame').style.display = '';
    }   
});