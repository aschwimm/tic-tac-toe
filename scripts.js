const Gameboard = (function() {
    function Gameboard() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        
        this.reset = function() {
            this.board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];
        };
        
        this.placeMarker = function(x, y, marker) {
            this.board[x][y] = marker;
        };
    }
    
    return Gameboard;
})();

const Player = function(name, marker) {
    this.name = name;
    this.marker = marker;
};


const gameboard = new Gameboard();
console.log(gameboard);

const player1 = new Player("John", "X");
const player2 = new Player("Mark", "O");

gameboard.placeMarker(0, 0, player1.marker);
gameboard.placeMarker(0, 1, player2.marker);
