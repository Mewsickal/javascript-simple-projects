const boardWidth = 3;

const gameBoard = (() => {
    let board = ['', 'x', '', '', '', 'o', '', 'x', ''];
    let fields = [];
    const getBoard = () => board;
    const onFieldClicked = (e) => {
        if (e.target.textContent === '') {
            e.target.textContent = 'x';
        }
    };
    const addDiv = (boardSize, index, container) => {
        const content = document.createElement('div');
        content.id = index;
        content.classList.add('board-el');
        container.appendChild(content);
        fields.push(content);
        content.addEventListener('click', onFieldClicked);
    };
    const fill = () => {
        fields.forEach(element => {
            element.textContent = board[element.id];
        });
    };
    const create = () => {
        let boardSize = boardWidth * boardWidth;
        for (let index = 0; index < boardSize; index++) {
            const container = document.querySelector("#container");
            addDiv(boardSize, index, container);
        }
        fill();
    };
    return { create };
})();

const player = () => {
    const start = () => {
    };
    return { start };
};

gameBoard.create();