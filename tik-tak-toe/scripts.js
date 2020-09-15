const boardWidth = 3;

const gameBoard = (() => {
    const addDiv = (boardSize, index, container) => {
        const content = document.createElement('div');
        content.id = index;
        content.classList.add('board-el');
        container.appendChild(content);
    };
    const create = () => {
        let boardSize = boardWidth * boardWidth;
        for (let index = 0; index < boardSize; index++) {
            const container = document.querySelector("#container");
            addDiv(boardSize, index, container);
        }
    };
    return { create };
})();

const Player = (s) => {
    let symbol = s;
    const getSymbol = () => symbol;
    const play = (fields) => { };
    return { getSymbol, play };
};

const AIPlayer = (s) => {
    const prototype = Player(s);
    const play = (fields) => {
        const allEmpty = fields.filter(el => el.textContent === '');
        allEmpty[allEmpty.length * Math.random() | 0].click();
    }
    return Object.assign({}, prototype, { play });
};

const game = (() => {
    let fields = [];
    let player1;
    let player2;
    let activePlayer;
    let winningSequence = [];
    let playAgain;
    var winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const changeActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
        activePlayer.play(fields);
    };
    const setWinningSequence = (newSequence) => {
        fields.forEach(el => el.classList.remove('colored'));
        newSequence.forEach(el => fields[el].classList.add('colored'));
        winningSequence = newSequence;
    }
    const getWinninSequence = () => {
        const sequence =
            winningCombo.find(el => fields[el[0]].textContent === fields[el[1]].textContent
                && fields[el[0]].textContent === fields[el[2]].textContent
                && fields[el[0]].textContent !== '');
        return sequence;
    };
    const getGameStatus = () => {
        let sequence = getWinninSequence();
        if (sequence || fields.every(el => el.textContent != '')) {
            return { gameOver: true, sequence: sequence };
        }
        return { gameOver: false, sequence: [] };
    };
    const setUpUI = (sequence) => {
        setWinningSequence(sequence);
        let winLabel = document.querySelector("#winLabel");
        winLabel.classList.toggle("hidden");
        if (sequence.length > 0) {
            winLabel.textContent = fields[sequence[0]].textContent === player1.getSymbol() ? "You win!" : "You lose!";
        }
        playAgain.classList.toggle("hidden");
    }
    const reset = (e) => {
        fields.forEach((element) => {
            element.textContent = '';
        });
        activePlayer = player1;
        setUpUI([]);
    };
    const onFieldClicked = (e) => {
        if (e.target.textContent === '' && winningSequence.length === 0) {
            e.target.textContent = activePlayer.getSymbol();
            let gameStatus = getGameStatus();
            if (gameStatus.gameOver) {
                setUpUI(gameStatus.sequence);
            }
            else {
                changeActivePlayer();
            }
        }
    }
    const start = () => {
        gameBoard.create();
        fields = Array.from(document.querySelectorAll('.board-el'));
        fields.forEach((element) => {
            element.addEventListener('click', onFieldClicked);
        });
        player1 = Player('x');
        player2 = AIPlayer('o');
        activePlayer = player1;
        playAgain = document.querySelector('#playAgain');
        playAgain.addEventListener('click', reset);
    };
    return { start };
})();

game.start();
