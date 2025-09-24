let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi'); // Fixed selector

const guessField = document.querySelector('.guessField'); // Fixed selector
const guessSubmit = document.querySelector('.guessSubmit'); // Fixed selector

let guessCount = 1;
let guessList = [];

// Display all previous guesses
function displayGuesses(userGuess) {
    guessList.push(userGuess);
    guesses.textContent = 'Previous guesses: ' + guessList.join(', ');

    // Check if 10 rounds are completed
    if (guessList.length >= 10) {
        gameOver();
    }
}

// Add this function to handle game over state
function gameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    
    // Create and show a "Start New Game" button
    let resetButton = document.createElement('button');
    resetButton.textContent = 'Start New Game';
    resetButton.classList.add('newgame')
    resetButton.setAttribute('id', 'reset');
    document.querySelector('.box').appendChild(resetButton);

    resetButton.addEventListener('click', startNewGame);
    
}

function startNewGame() {
    guessCount = 1;
    guessList = [];
    guesses.textContent = '';
    lastResult.textContent = '';
    lastResult.style.backgroundColor = '';
    lowOrHi.textContent = '';
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    randomNumber = Math.floor(Math.random() * 100) + 1;

    // Remove the reset button if it exists
    const resetButton = document.getElementById('reset');
    if (resetButton) {
        resetButton.parentNode.removeChild(resetButton);
    }
}


// Show result of the last guess
function displayLastResult(userGuess) {
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lastResult.style.color = 'white';
        lowOrHi.textContent = '';
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        lastResult.style.color = 'white';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }
}

guessSubmit.addEventListener('click', function () {
    const userGuess = Number(guessField.value);
    displayGuesses(userGuess);
    displayLastResult(userGuess);

    if (userGuess === randomNumber) {
        gameOver();
    }

    guessField.value = '';
    guessField.focus();
});