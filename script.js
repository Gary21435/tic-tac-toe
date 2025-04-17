class Gameboard {
    constructor() {
        this.array = new Array(9).fill(null);
        this.boardWidth = 700;
        this.boardHeight = 700;
    }

    createGridNode() {
        const grid_container = document.createElement("div");
        document.body.appendChild(grid_container);
        grid_container.classList.add("grid-container")
        grid_container.style.width = `${this.width}px`;
        grid_container.style.height = `${this.height}px`;

        grid_container.addEventListener("click", (e) => this.handleClick(e.target))

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
        thisGame.gameboard.array[cell.id] = cell.textContent = thisGame.turn.sign;
        thisGame.turn = !thisGame.turn;
    }   
}

class Game {
    constructor() {
        this.game_over = false;
        this.gameboard = new Gameboard();
        this.players = [new Player('X'), new Player('O')];
        this.turn = this.players[0];
    }

    createGameboard() {
        this.gameboard.createGridNode();
    }
}

class Player {
    constructor(sign) {
        this.sign = sign;
    }
}

const thisGame = new Game();
const thisGameboard = thisGame.createGameboard();