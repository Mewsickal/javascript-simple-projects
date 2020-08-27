const boardWidth = 3;

const gameBoard = (() => {
    let board = ['', 'x', '', '', '', 'o', '', 'x', ''];
    const getBoard = () => board;
    const addDiv = (boardSize, index, container) => {
        const content = document.createElement('div');
        content.classList.add('board-el');
        content.textContent = board[index];
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

const game = (() => {
    const start = () => {
    };
    return { start };
})();

gameBoard.create();