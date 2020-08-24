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

function GameResult() {
    this.won = 0;
    this.lost = 0;
    this.tie = 0;
}

GameResult.prototype.addRoundResult = function (roundResult) {
    switch (roundResult) {
        case result.WIN:
            this.won++;
            break;
        case result.LOSE:
            this.lost++;
            break;
        case result.TIE:
            this.tie++;
            break;
    }
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
    gameResult.addRoundResult(roundResult);
    runningScore.textContent = `WON: ${gameResult.won} LOST: ${gameResult.lost} TIE: ${gameResult.tie}`;
}

const choiceButtons = document.querySelectorAll('button.choice');
choiceButtons.forEach((button) => {
    button.addEventListener('click', onChoiceButtonClicked);
});
const roundInfo = document.querySelector('div#round-info');
const runningScore = document.querySelector('div#running-score');
let gameResult = new GameResult();