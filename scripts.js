// Gameboard constructor creates a 2d array of empty strings to represent a 3x3 grid
document.addEventListener("DOMContentLoaded", initGame);
function Gameboard() {
    this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    
}
function initGame() {
    const gameboard = new Gameboard();
    const players = {}
    gameboard.board.forEach(row => {
        row.forEach(() => {
            const container = document.getElementById("grid-container");
            const gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            // gridSquare.addEventListener("click", () => {
            //     gridSquare.innerHTML = 
            // })
            container.append(gridSquare)
        })
    })
    const menuForm = document.getElementById("menu-form");
    for(const element of menuForm) {
        element.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
            event.preventDefault();
            const player = new Player(element.value, element.id);
            players[element.name] = player;
            console.log(players)
            }
        });
    }
    return players;
    
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
    this.name = name
    this.marker = marker
    this.placeMarker = (x, y, gameboard) => {
        if(gameboard[x][y] === "") {
            gameboard[x][y] = this.marker;
            checkWin(gameboard, this.marker, this.name);
        } else {
            console.log("space is occupied");
            return;
        }
    }
}
Object.setPrototypeOf(Player, Gameboard);

const player1 = new Player("John", "X");
const player2 = new Player("Mike", "O");

