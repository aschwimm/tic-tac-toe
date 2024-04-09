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
                    game.gameboard[gridSquare.x][gridSquare.y] = game.players[0].marker;
                    game.players[0].turn = false;
                    game.players[1].turn = true;
                } else {
                    game.gameboard[gridSquare.x][gridSquare.y] = game.players[1].marker;
                    game.players[1].turn = false;
                    game.players[0].turn = true;
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