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
    let winner;
    const changeActivePlayer = () => {
        activePlayer = (activePlayer === player1) ? player2 : player1;
        activePlayer.play(fields);
    };
    const getGameStatus = () => {
        let gameOver = false;
        let winner;
        if (fields.every(el => el.textContent != '')) {
            gameOver = true;
            winner = null;
        };
        return { gameOver, winner };
    };
    const reset = () => {
        fields.forEach((element) => {
            element.textContent = '';
        });
        activePlayer = player1;
        winner = null;
    };
    const onFieldClicked = (e) => {
        if (e.target.textContent === '') {
            e.target.textContent = activePlayer.getSymbol();
            let gameStatus = getGameStatus();
            if (gameStatus.gameOver) {
                reset();
            }
            else {
                changeActivePlayer();
            }
        }
    };
    const start = () => {
        gameBoard.create();
        fields = Array.from(document.querySelectorAll('.board-el'));
        fields.forEach((element) => {
            element.addEventListener('click', onFieldClicked);
        });
        player1 = Player('x');
        player2 = AIPlayer('o');
        activePlayer = player1;
    };
    return { start };
})();

game.start();
