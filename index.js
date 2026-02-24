const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let arr = [];
let turn = 1;
let counter = 0;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        arr.push([]);
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
            arr[i].push(EMPTY)
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (arr[row][col] !== EMPTY)
        return;
    let symbol = ' ';
    if (turn === 1)
        symbol = CROSS;
    else
        symbol = ZERO;
    turn = turn % 2 + 1;
    arr[row][col] = symbol;
    counter++;
    renderSymbolInCell(symbol, row, col);

    checkWinner();

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner () {
    if (counter === arr.length * arr[0].length){
        alert('Победила дружба')
        return;
    }
    else if (checkSpecifiedWinner(CROSS))
        alert('Победили крестики');
    else if (checkSpecifiedWinner(ZERO))
        alert('Победили нолики')
}

function checkSpecifiedWinner (symbol) {
    const size = arr.length;
    for (let i = 0; i < size; i++) {
        if (arr[i].every(cell => cell === symbol)) {
            return true;
        }
    }

    for (let j = 0; j < size; j++) {
        let columnWins = true;
        for (let i = 0; i < size; i++) {
            if (arr[i][j] !== symbol) {
                columnWins = false;
                break;
            }
        }
        if (columnWins) {
            return true;
        }
    }

    let mainDiagonalWins = true;
    for (let i = 0; i < size; i++) {
        if (arr[i][i] !== symbol) {
            mainDiagonalWins = false;
            break;
        }
    }
    if (mainDiagonalWins) {
        return true;
    }

    let antiDiagonalWins = true;
    for (let i = 0; i < size; i++) {
        if (arr[i][size - 1 - i] !== symbol) {
            antiDiagonalWins = false;
            break;
        }
    }
    if (antiDiagonalWins) {
        return true;
    }

    return false;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
