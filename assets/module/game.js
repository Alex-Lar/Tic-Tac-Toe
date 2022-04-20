export { pushToBoard, isWinner, switchToNum, computerMove, checkPosition };

class Transfer {
    constructor(storage) {
        this.storage = storage;
    }

    add(a, b) {
        this.storage.push(a, b);
    }

    shiftTwo() {
        for (let i = 0; i < 2; i++) {
            this.storage.shift();
        }
    }

    clearAll() {
        this.storage = [];
    }
}

const cellData = new Transfer([]);


const gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function pushToBoard(move, isUser) {
    let symbol = isUser ? "X" : "O";
    switch (move) {
        case 1:
            gameBoard[0][0] = symbol;
            break;
        case 2:
            gameBoard[0][1] = symbol;
            break;
        case 3:
            gameBoard[0][2] = symbol;
            break;
        case 4:
            gameBoard[1][0] = symbol;
            break;
        case 5:
            gameBoard[1][1] = symbol;
            break;
        case 6:
            gameBoard[1][2] = symbol;
            break;
        case 7:
            gameBoard[2][0] = symbol;
            break;
        case 8:
            gameBoard[2][1] = symbol;
            break;
        case 9:
            gameBoard[2][2] = symbol;
            break;
    }
}

function computerMove() {
    let compCell;
    let isTaken;

    do {
        compCell = Math.floor(Math.random() * 9);
        isTaken = checkPosition(compCell + 1);
    } while (!isTaken);
    
    pushToBoard(compCell + 1, false);

    return compCell;
}


function checkPosition(pos) {
    if (pos === 1) {
        if (gameBoard[0][0] === ' ') {
            return true;
        }
    } else if (pos === 2) {
        if (gameBoard[0][1] === ' ') {
            return true;
        }
    } else if (pos === 3) {
        if (gameBoard[0][2] === ' ') {
            return true;
        }
    } else if (pos === 4) {
        if (gameBoard[1][0] === ' ') {
            return true;
        }
    } else if (pos === 5) {
        if (gameBoard[1][1] === ' ') {
            return true;
        }
    } else if (pos === 6) {
        if (gameBoard[1][2] === ' ') {
            return true;
        }
    } else if (pos === 7) {
        if (gameBoard[2][0] === ' ') {
            return true;
        }
    } else if (pos === 8) {
        if (gameBoard[2][1] === ' ') {
            return true;
        }
    } else if (pos === 9) {
        if (gameBoard[2][2] === ' ') {
            return true;
        }
    }
    return false;
}


function switchToNum() {
    const cellNums = [];

    for (let i = 0; i < 3; i++) {
        const [A, B] = cellData.storage;
        if (A === 0 && B === 0) {
            cellNums.push(0);
        }
        if (A === 0 && B === 1) {
            cellNums.push(1);
        }
        if (A === 0 && B === 2) {
            cellNums.push(2);
        }
        if (A === 1 && B === 0) {
            cellNums.push(3);
        }
        if (A === 1 && B === 1) {
            cellNums.push(4);
        }
        if (A === 1 && B === 2) {
            cellNums.push(5);
        }
        if (A === 2 && B === 0) {
            cellNums.push(6);
        }
        if (A === 2 && B === 1) {
            cellNums.push(7);
        }
        if (A === 2 && B === 2) {
            cellNums.push(8);
        }
        cellData.shiftTwo();
    }

    return cellNums;
}


function isWinner(isUser) {
    let symbol = isUser ? "X" : "O";
    let diagonalCountOne = 0;
    let diagonalCountSec = 0;

    for (let i = 0; i < gameBoard.length; i++) {
        let horizontalCount = 0;
        let verticalCount = 0;

        for (let j = 0; j < gameBoard.length; j++) {
            if (gameBoard[i][j] === symbol) {
                horizontalCount++;
                cellData.add(i, j);
            }
        }
        if (horizontalCount === 3) {
            return true;
        }
        cellData.clearAll();

        for (let j = 0; j < gameBoard.length; j++) {
            if (gameBoard[j][i] === symbol) {
                verticalCount++;
                cellData.add(j, i);
            }
        }
        if (verticalCount === 3) {
            return true;
        }
        cellData.clearAll();
    }

    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i][i] === symbol) {
            diagonalCountOne++;
            cellData.add(i, i);
        }
    }

    if (diagonalCountOne === 3) {
        return true;
    }
    cellData.clearAll();

    for (let i = 2, j = 0; i > -1; i--, j++) {
        if (gameBoard[i][j] === symbol) {
            diagonalCountSec++;
            cellData.add(i, j);
        }
    }
    if (diagonalCountSec === 3) {
        return true;
    }
    cellData.clearAll();

    return false;
}