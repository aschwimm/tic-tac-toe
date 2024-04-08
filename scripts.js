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
}
const game = {
    players: [],
    score: null,
    gameboard: new Gameboard()

}
const playerNameListener = (function(){
    const nameForm = document.getElementById("player-name-form");
    for(const input of nameForm) {
        console.log(input);
        input.addEventListener("keypress", (event) => {
            event.preventDefault();
            if(event.key === "Enter") {
                const player = new Player(input.value, input.name);
                game.players.push(player);
            }
        })
    }
})