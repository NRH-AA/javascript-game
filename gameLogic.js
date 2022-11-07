let players = [];
let currentPlayer = {};
let maxNumber = 2;
let numberToGuess = randomIntFromInterval(1, maxNumber);

class Player {
    constructor(name) {
        this.currScore = 20;
        this.highScore = 0;
        this.name = name;
    }
}

// Add a new game player
export let addPlayer = () => {
    let name = document.querySelector('#newPlayerName').value;
    if (name === '') {
        document.querySelector('#addPlayerError').textContent = 'You must enter a name!';
        return false;
    }
    if (nameTaken(name)) {
        document.querySelector('#addPlayerError').textContent = 'Name is already taken!';
        return false;
    }
    
    document.querySelector('#addPlayerError').textContent = '';
    const newPlayer = new Player(name);
    players.push(newPlayer);
    
    if (players.length === 1) {
        currentPlayer = newPlayer;
    }
    
    showPlayers(true);
}

// Show players in a list : isAddingNewPlayer only used when adding new players
let lastCount = 0;
export function showPlayers(isAddingNewPlayer = false) {
    if (isAddingNewPlayer) {
        if (players.length === lastCount) {
            document.querySelector('#addPlayerError').textContent = '';
        } else {
            lastCount = players.length;
        }
    }
    
    if (!players.length) {
        document.querySelector('#showPlayers').textContent = '';
        document.querySelector('#showPlayers2').textContent = '';
        return true;
    }
    
    let text = `[${players[0].name}]`;
    for (let i = 1; i < players.length; i++) {
        text += `, [${players[i].name}]`;
    }
    
    document.querySelector('#showPlayers').textContent = text;
    document.querySelector('#showPlayers2').textContent = text;
}

// Check if player name is taken.
let nameTaken = (name) => {
    let taken = false;
    players.forEach(el => {
        if (el.name === name) {
            taken = true;
        }
    })
    return taken;
}

// Switch to add player or play game view on page
let addPlayerFocus = true;
export function swapFocus(startGame = false) {
    if (startGame && !players.length) return false;
    
    const gameDiv = document.getElementById('game');
    const addPlayerDiv = document.getElementById('addPlayers');
    if (addPlayerFocus) {
        gameDiv.style.display = 'none';
        addPlayerDiv.style.display = 'block';
        addPlayerFocus = false;
    } else {
        addPlayerDiv.style.display = 'none';
        gameDiv.style.display = 'block';
        document.querySelector('#currentPlayer').textContent = 'Playing: ' + currentPlayer.name;
        document.querySelector('#currentPlayerHighScore').textContent = 'HighScore: ' + currentPlayer.highScore;
        document.querySelector('#currentPlayerScore').textContent = 'Guesses Left: ' + currentPlayer.currScore;
        showPlayers();
        addPlayerFocus = true;
    }
}

// Check the number guessed
export function checkNumber() {
    currentPlayer.currScore -= 1;
    
    if (currentPlayer.name === players[players.length -1].name && currentPlayer.currScore === 0) {
        newGame();
        return true;
    }
    
    const numberGuessed = document.querySelector('#numberGuessed').value;
    if (numberGuessed < numberToGuess) {
        document.querySelector('#hint').textContent = 'The number is higher!';
    } else if (numberGuessed > numberToGuess) {
        document.querySelector('#hint').textContent = 'The number is lower!';
    } else {
        document.querySelector('#hint').textContent = currentPlayer.name + ' has guessed the correct number!';
        currentPlayer.highScore += 1;
        newGame();
        return true;
    }
    
    getNextPlayer();
}

// Get the next players turn.
function getNextPlayer() {
    let playerIndex = -1;
    for (let i = 0; i < players.length; i++) {
        if (players[i].name === currentPlayer.name) {
            playerIndex = i;
        }
    }
    
    if (players[playerIndex + 1] === undefined) {
        currentPlayer = players[0];
    } else {
        currentPlayer = players[playerIndex + 1];
    }
    document.querySelector('#currentPlayer').textContent = 'Playing: ' + currentPlayer.name;
    document.querySelector('#currentPlayerHighScore').textContent = 'HighScore: ' + currentPlayer.highScore;
    document.querySelector('#currentPlayerScore').textContent = 'Guesses Left: ' + currentPlayer.currScore;
}

// Start a new game : fullReset will wipe everything.
export function newGame(fullReset = false) {
    if (fullReset) {
        players = [];
        currentPlayer = {};
        numberToGuess = randomIntFromInterval(1, maxNumber);
        document.querySelector('#hint').textContent = ''
        swapFocus();
        showPlayers();
        return true;
    }
    
    
    currentPlayer = players[0];
    numberToGuess = randomIntFromInterval(1, maxNumber);
    players.forEach(el => {
        el.currScore = 20;
    })
    document.querySelector('#currentPlayer').textContent = 'Playing: ' + currentPlayer.name;
    document.querySelector('#currentPlayerHighScore').textContent = 'HighScore: ' + currentPlayer.highScore;
    document.querySelector('#currentPlayerScore').textContent = 'Guesses Left: ' + currentPlayer.currScore;
    document.querySelector('#hint').textContent = ''
    return true;
}




// Generate a random number between two values
export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
