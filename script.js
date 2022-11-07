import {addPlayer, swapFocus, checkNumber, newGame} from './gameLogic.js';
import {randomIntFromInterval} from './gameLogic.js';

// Tells javascript things to load after the elements in the html file have loaded.
window.onload=function(){
    document.querySelector('#submitPlayer').addEventListener('click', addPlayer);
    document.querySelector('#startGame').addEventListener('click', swapFocus, true);
    document.querySelector('#checkNumber').addEventListener('click', checkNumber);
    document.querySelector('#restartGame').addEventListener('click', newGame, true);
}

swapFocus(false);
