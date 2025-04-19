class Gameboard {
    constructor() {
        this.array = new Array(9).fill(null);
        this.boardWidth = 700;
        this.boardHeight = 700;
    }
    overlay_div = null;
    // lines = [
    //     [0, 1, 2],
    //     [3, 4, 5],
    //     [6, 7, 8],
    //     [0, 3, 6],
    //     [],
    //     [],
    //     [],
    //     []
    // ]

    createGridNode() {
        const grid_container = document.createElement("div");
        document.body.appendChild(grid_container);
        grid_container.classList.add("grid-container")
        grid_container.style.width = `${this.width}px`;
        grid_container.style.height = `${this.height}px`;

        grid_container.addEventListener("click", (e) => {
            if(e.target.id) this.handleClick(e.target);
        })

        // Populate grid with divs that will later contain the X's and O's
        for(let i = 0; i < 9; i++) {
            const grid_cell = document.createElement("button");
            grid_cell.classList.add("grid-cell");
            grid_container.appendChild(grid_cell);
            grid_cell.id = `${i}`;
            grid_cell.textContent = null;
            grid_cell.style.width = `${(this.boardWidth-40)/3}px`;
            grid_cell.style.height = `${(this.boardHeight-40)/3}px`;
        }
    }

    handleClick(cell) {
        if(cell.textContent !== "") return;
        if(thisGame.game_over) return;
        thisGame.gameboard.array[cell.id] = cell.textContent = thisGame.turn.sign;
        thisGame.turn.addIndex(cell.id);
        console.log(cell.id);
        thisGame.turn.myArray[cell.id] = thisGame.turn.sign;
        console.log(!thisGame.turn.index);
        thisGame.turn_index ^= 1;
        thisGame.turn = thisGame.players[thisGame.turn_index];
        thisGame.checkWinner();
    }   

    displayMessage(msg) { // SMTH EXTRA HAPPENS WHEN YOU HIT NEW GAME AFTER WINNING
        const rect = document.querySelector(".grid-container").getBoundingClientRect();
                
        const overlay = document.createElement("div");
        this.overlay_div = overlay;
        overlay.textContent = msg;
        overlay.classList.add("overlay");
        overlay.setAttribute("style", `
            position:absolute; 
            top: ${rect.top}px; 
            left: ${rect.left}px; 
            width: ${rect.width}px;
            height: ${rect.height}px    
        `);
        document.body.appendChild(overlay);

        const play_again = document.createElement("button");
        play_again.textContent = "Play Again";
        overlay.appendChild(play_again);
        play_again.classList.add("play-again");

        play_again.addEventListener("click", this.startOver);
    }

    startOver() {
        const cells = document.querySelectorAll(".grid-cell");
        for (const cell of cells)
            cell.textContent = "";
        thisGame.startOver();
    }

    clear() {
        this.array.fill(null);
        this.overlay_div.remove();
    }
}

class Game {
    constructor() {
        this.game_over = false;
        this.gameboard = new Gameboard();
        this.players = [new Player('X'), new Player('O')];
        this.turn_index = 0;
        this.turn = this.players[this.turn_index];
        this.scores = [document.querySelector(".x-score"), document.querySelector(".y-score")];
    }

    createGameboard() {
        this.gameboard.createGridNode();
    }

    checkWinner() {
        this.players.forEach((player, index) => {
            if(player.checkWin()) {
                this.gameboard.displayMessage(`${player.sign} won!`);
                this.game_over = true;
                player.score++;
                this.scores[index].textContent = player.score;
            }  
        });
    }

    startOver() {
        console.log(this.players);
        for (const player of this.players)
            player.clear();
        this.gameboard.clear();
        this.game_over = false;
        this.turn_index = 0;
        this.turn = this.players[0];
    }
}

class Player {
    constructor(sign) {
        this.sign = sign;
        this.score = 0;
        this.myArray = new Array(9).fill(null);
        this.i_arr = [];
    }

    addIndex(i) {
        this.i_arr.push(Number(i));
    }

    checkWin() {
        if(this.i_arr.includes(0)) console.log("includes 0!");
        if(this.i_arr.includes(0) && ((this.i_arr.includes(1) && this.i_arr.includes(2))
            || (this.i_arr.includes(3) && this.i_arr.includes(6))
            || (this.i_arr.includes(4) && this.i_arr.includes(8)))) 
            return true;
        if(this.i_arr.includes(1) && ((this.i_arr.includes(4) && this.i_arr.includes(7))))
            return true;
        if(this.i_arr.includes(2) && ((this.i_arr.includes(5) && this.i_arr.includes(8))
            || (this.i_arr.includes(4) && this.i_arr.includes(6)))) 
            return true;
        if(this.i_arr.includes(3) && ((this.i_arr.includes(4) && this.i_arr.includes(5)))) 
            return true;
        if(this.i_arr.includes(3) && ((this.i_arr.includes(4) && this.i_arr.includes(5)))) 
            return true;
        return false;
    }

    clear() {
        this.myArray.fill(null);
        this.i_arr = [];
    }
}

const thisGame = new Game();
const thisGameboard = thisGame.createGameboard();