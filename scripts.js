function Gameboard() {
    this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
}
function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.turn = false;
}
function turnRandomizer() {
    const turnIndex = Math.floor(Math.random() * 2);
    return turnIndex;
}
const game = {
    players: [],
    score: null,
    gameboard: new Gameboard().board,
    startGame: function() {
        if (game.players.length >= 2) {
            const playerTurn = turnRandomizer();
            game.players[playerTurn].turn = true;
        }
    }
    
}
function checkWin(player) {
    if(game.gameboard[1][1] === player.marker) {
        if(game.gameboard[0][0] === player.marker && game.gameboard[2][2] === player.marker) {
            console.log(`Diagonal victory! ${player.name} wins!`)
            return
        }
        else if(game.gameboard[0][2] === player.marker && game.gameboard[2][0] === player.marker) {
            console.log(`Diagonal victory! ${player.name} wins!`)
            return
        }
    }
    for(const row of game.gameboard) {
        if(row.every((value) => value === player.marker)) {
            console.log(`Horizontal victory! ${player.name} wins!`);
            return
        }
    }
    for(let i = 0; i < game.gameboard.length; i++) {
        const column = game.gameboard.map((row) => row[i])
        if(column.every((value) => value === player.marker)) {
            console.log(`Vertical victory! ${player.name} wins!`)
            return
        }
    }
    
}
const playerNameListener = (function(){
    const nameForm = document.getElementById("player-name-form");
    for(const input of nameForm) {
        input.addEventListener("keypress", (event) => {
            if(event.key === "Enter") {
                const player = new Player(input.value, input.name);
                game.players.push(player);
                input.value = "";
            }
        })
    }
})();
const drawGrid = (function() {
    const container = document.getElementById("container");
    for(let i = 0; i < game.gameboard.length; i++ ){
        for(let j = 0; j < game.gameboard[0].length; j++) {
            const gridElement = document.createElement("div");
            gridElement.classList.add("grid-square");
            gridElement.addEventListener("click", () => {
                if (game.players[0].turn) {
                    const marker = game.players[0].marker;
                    game.gameboard[gridSquare.x][gridSquare.y] = marker
                    game.players[1].turn = true;
                    game.players[0].turn = false;
                    checkWin(game.players[0]);
                } else {
                    const marker = game.players[1].marker;
                    game.gameboard[gridSquare.x][gridSquare.y] = marker;
                    game.players[1].turn = false;
                    game.players[0].turn = true;
                    checkWin(game.players[1]);
                }
            });
            const gridSquare = new GridSquare(i, j, gridElement);
            container.append(gridSquare.square);
        }
    }  
})();

Player.prototype.placeMarker = function() {
    console.log(this);
    console.log(this.turn);
}

function GridSquare(x, y, square) {
    this.x = x;
    this.y = y;
    this.square = square;
}