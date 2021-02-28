/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var globalScores, roundScore, activePlayer, gamePlaying;

init();




 document.querySelector('.btn-roll').addEventListener('click' , function(){

        if(gamePlaying){
         //  ** 1. need a random number **
         var dice = Math.floor(Math.random() * 6) + 1 + 1 + 1;
// added the last +1, +1 

         //  ** 2. display result ** 
         var diceDOM = document.querySelector('.dice');
         diceDOM.style.display = 'block';
         diceDOM.src = 'dice-' + dice + '.png';

         // ** 3. update round score OF rolled number was not a 1 ** 
         if (dice > 1) {
             // add score
             roundScore += dice;
             document.getElementById('current-' + activePlayer).textContent = roundScore;
         } else {
             // next players turn (check if active player is 0, if true change activePlayer to 1, if activePlayer was 1 then the else part gets executed changing activePlayer to 0)
             nextPlayer();
         }
        }
 });
   
document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying){
        //  1. add current score to global score
        globalScores[activePlayer] += roundScore;

        // 2. update UI
        document.querySelector('#score-' + activePlayer).textContent = globalScores[activePlayer];

        // 3. check if player won game
        if (globalScores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }
   
    

 });


function nextPlayer() {
    // NEXT player turn (check if active player is 0, if true change activePlayer to 1, if activePlayer was 1 then the else part gets executed changing activePlayer to 0)


    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // when a player rolls a 1 the activePlayer changes and the roundScore needs to be set back to 0
    roundScore = 0;
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    // document.querySelector('.player-0-panel').classList.remove('active')
    // document.querySelector('.player-1-panel').classList.add('active')

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none'
};

    document.querySelector('.btn-new').addEventListener('click', init);

    function init(){
        globalScores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;

        document.querySelector('.dice').style.display = 'none';

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner')
        document.querySelector('.player-1-panel').classList.remove('winner')
        document.querySelector('.player-0-panel').classList.remove('active')
        document.querySelector('.player-0-panel').classList.remove('active')
        document.querySelector('.player-0-panel').classList.add('active')
    }

 // dice = Math.floor(Math.random() * 6) + 1 ;

// document.querySelector('#current-' + activePlayer).textContent = dice;

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
