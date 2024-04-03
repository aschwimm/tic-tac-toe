function Gameboard() {
    this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    
}
function Player(name, marker) {
    this.name = name
    this.marker = marker
    this.placeMarker = (x, y, gameboard) => {
        gameboard[x][y] = this.marker;
        function checkForWin() {
            
        }
        return gameboard
    }
    
}
Object.setPrototypeOf(Player, Gameboard);
const gameboard = new Gameboard();
const player1 = new Player("John", "X");
const player2 = new Player("Mike", "O");

