const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

let points = [];
let turn = 1;
let completeTurn = 0;
let endGame = false;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        let line = [];

        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
            line.push(0)
        }
        container.appendChild(row);
        points.push(line)
    }
}

function cellClickHandler (row, col) {
    if (points[row][col] == 0 && !endGame){
        points[row][col] = turn;
        console.log(points);
        console.log(`Clicked on cell: ${row}, ${col}`);
        /* Пользоваться методом для размещения символа в клетке так: */
        if (turn == 1){
            renderSymbolInCell(CROSS, row, col);
        }
        else{
            renderSymbolInCell(ZERO, row, col);
        }
        turn *= -1;
        completeTurn++;
        let win1 = checkWinner(1, CROSS);
        let win2 = checkWinner(-1, ZERO);
        if(win1){
            endGame = true;
            alert("Победили кретили");
        }
        else if(win2){
            endGame = true;
            alert("Победили нолики");
        }
        else if(completeTurn == 9){
            alert("Победила дружба");
        }
    }
}

function checkWinner(symbol, figure){
    let win = false;
    for(let i = 0; i < 3; i++){
        if (points[0][i] == symbol && points[1][i] == symbol && points[2][i] == symbol){
            win = true;
            renderSymbolInCell(figure, 0, i);
            renderSymbolInCell(figure, 1, i);
            renderSymbolInCell(figure, 2, i);
        }
        if (points[i][0] == symbol && points[i][1] == symbol && points[i][2] == symbol){
            win = true;
            renderSymbolInCell(figure, i, 0);
            renderSymbolInCell(figure, i, 1);
            renderSymbolInCell(figure, i, 2);
        }
    }
    if (points[0][0] == symbol && points[1][1] == symbol && points[2][2] == symbol){
        win = true;
        renderSymbolInCell(figure, 0, 0);
        renderSymbolInCell(figure, 1, 1);
        renderSymbolInCell(figure, 2, 2);
    }
    if (points[0][2] == symbol && points[1][1] == symbol && points[2][0] == symbol){
        win = true;
        renderSymbolInCell(figure, 0, 2);
        renderSymbolInCell(figure, 1, 1);
        renderSymbolInCell(figure, 2, 0);        
    }
    return win;
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
