const choice = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
}

const result = {
    WIN: 'win',
    LOSE: 'lose',
    TIE: 'got tie'
}

function computerPlay() {
    let random = Math.floor(Math.random() * Math.floor(3));
    switch (random) {
        case 0:
            return choice.ROCK;
            break;
        case 1:
            return choice.PAPER;
            break;
        case 2:
            return choice.SCISSORS;
            break;
    }
}

function playRound(playerSelection, computerSelection) {
    let playerWins = false;
    let roundResult;
    if (playerSelection === computerSelection) {
        roundResult = result.TIE;
    }
    else if (playerSelection === choice.ROCK && computerSelection === choice.SCISSORS
        || playerSelection === choice.PAPER && computerSelection === choice.ROCK
        || playerSelection === choice.SCISSORS && computerSelection === choice.PAPER) {
        roundResult = result.WIN;
    }
    else {
        roundResult = result.LOSE;
    }
    return roundResult;
}

function addRoundToGameResult(currentResult, roundResult) {
    return {
        won: (roundResult === result.WIN) ? (currentResult.won + 1) : currentResult.won,
        lost: (roundResult === result.LOSE) ? (currentResult.lost + 1) : currentResult.lost,
        tie: (roundResult === result.TIE) ? (currentResult.tie + 1) : currentResult.tie
    };
}

function createGameResult() {
    return {
        won: 0,
        lost: 0,
        tie: 0
    };
}

function onChoiceButtonClicked(e) {
    let playerSelection = e.target.value;
    if (playerSelection == null) {
        return;
    }
    playerSelection = playerSelection.toLowerCase();
    if (!Object.keys(choice).some(k => choice[k] === playerSelection)) {
        return;
    }
    let computerSelection = computerPlay();
    let roundResult = playRound(playerSelection, computerSelection);
    roundInfo.textContent = `You ${roundResult}! ${playerSelection.toString()} vs ${computerSelection.toString()}`;
    gameResults = addRoundToGameResult(gameResults, roundResult);
    runningScore.textContent = `WON: ${gameResults.won} LOST: ${gameResults.lost} TIE: ${gameResults.tie}`;
}

const choiceButtons = document.querySelectorAll('button.choice');
choiceButtons.forEach((button) => {
    button.addEventListener('click', onChoiceButtonClicked);
});
const roundInfo = document.querySelector('div#round-info');
const runningScore = document.querySelector('div#running-score');
let gameResults = createGameResult();