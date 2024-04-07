// Gameboard constructor creates a 2d array of empty strings to represent a 3x3 grid
function Gameboard() {
    this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    
}

function playerSelection() {
    const menuForm = document.getElementById("menu-form");
    const player1 = new Player(menuForm.player1.value, menuForm.player1.id);
    const player2 = new Player(menuForm.player2.value, menuForm.player2.id);
    return {player1, player2};
}
const initGame = (function() {
    const playButton = document.getElementById("play-game");
    playButton.addEventListener("click", (event) => {
        event.preventDefault();
        const players = playerSelection();
        console.log(players);
    });
    console.log(players);
    const container = document.getElementById("grid-container");
    const gameboard = new Gameboard();
    for(let i = 0; i < gameboard.board.length; i++ ) {
        for(let j = 0; j < gameboard.board[i].length; j++) {
            const square = new Square();
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            square.x = i;
            square.y = j;
            square.element = gridSquare;
            container.append(gridSquare);
            square.element.addEventListener("click", ()=> {
                player1.placeMarker(square.x, square.y, gameboard.board);
                square.element.innerHTML = player1.marker;
            })
        }
    }
})();
function Square(x, y, element) {
    this.x = x;
    this.y = y;
    this.element = element
}
function checkWin(gameboard, marker, name) {
    // Iterate through each row in the array, if every element in the array in each row matches the marker, indicates a row win
    for(const row of gameboard) {
        if(row.every(value => value === marker)) {
            console.log(`${name} wins!`);
            return
        }
    }
    for (let i = 0; i < gameboard.length; i++) {
        // Map is called on the gameboard to create a new array that represents a column in the tic-tac-toe grid
        const column = gameboard.map(row => row[i]);
        // .every method is used to check if the new column array is filled with the player's marker
        if (column.every(value => value === marker)) {
            console.log(`${name} wins!`);
            return
        }
    }
    // A player must have a marker in the middle of the grid at [1][1] for a diagonal win to be possible
    // If statements check for either of two possible possible combinations of coordinates for a diagonal win
    if(gameboard[1][1] === marker) {
        if(gameboard[0][0] === marker && gameboard[2][2] === marker) {
            console.log(`${name} wins!`);
            return
        }
        else if (gameboard[0][2] === marker && gameboard[2][0] === marker) {
            console.log(`${name} wins!`);
            return
        }
    }
    // If there are no empty strings indicating an unoccupied spot on the gameboard and a winner hasn't been declared
    // then there must be a tie
    if (!(gameboard.some(row => row.some(value => value === "")))) {
        console.log("Tie!")
        return;
    }
    
}
function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.turn = true;
    this.placeMarker = (x, y, gameboard) => {
        if(this.turn) {
            if(gameboard[x][y] === "") {
                gameboard[x][y] = this.marker;
                // this.turn = false;
                checkWin(gameboard, this.marker, this.name);
            } else {
                console.log("space is occupied");
                return;
            }
        } else {
            console.log(`not ${this.name}'s turn`)
        }
    }
}


