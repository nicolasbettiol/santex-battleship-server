import Player = require("../player/Player");
import Ship = require("./Ship");

class Board{
    id: string
    playerId: string
    status: string
    board: number[][]
    ships: Ship[]

    constructor(playerId){
        this.playerId = playerId;
        this.status = "CREATED";
        this.ships = new Array<Ship>();
        this.ships.push(new Ship(3, 10));
        this.ships.push(new Ship(3, 20));
        this.board = [
            [20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ];
    }
}

export = Board