window.onload=function(){
    document.querySelector('.submit').addEventListener('click', checkGuess);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let number = randomIntFromInterval(1, 20);

function checkGuess() {
    const guess = Number(document.querySelector('.guess').value);
    let score = Number(document.querySelector('.score').textContent);
    
    if (!guess && guess !== 0) {
        alert('You must type a guess.');
        return;
    }
    
    if (typeof guess != 'number') {
        document.querySelector('.hint').textContent = 'You must guess a number';
    } else if (guess != number) {
        if (guess < number) {
            document.querySelector('.hint').textContent = 'That is not the correct number! The number is higher!';
            score -= 1;
        } else {
            document.querySelector('.hint').textContent = 'That is not the correct number! The number is lower!';
            score -= 1;
        }
        document.querySelector('.score').textContent = String(score);
    } else if (guess == number) {
        document.querySelector('.hint').textContent = 'That is correct! Lets try another one.';
        score -= 1;
        document.querySelector('.number').textContent = String(score);
        number = randomIntFromInterval(1, 20);
        document.querySelector('.score').textContent = '20';
        return;
    }
    
    if (score === 0) {
        document.querySelector('.hint').textContent = 'You have failed to guess the correct number.';
        number = randomIntFromInterval(1, 20);
        document.querySelector('.score').textContent = '20';
        return;
    }
}
