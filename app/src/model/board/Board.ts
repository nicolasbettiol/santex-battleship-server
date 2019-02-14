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
        // TODO: use Ship objects
        this.board = [
            [20, 20, 20, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 10, 0, 0, 0, 0, 40, 0],
            [0, 0, 0, 10, 0, 0, 0, 0, 40, 0],
            [0, 0, 0, 10, 0, 0, 0, 0, 40, 0],
            [0, 0, 0, 10, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 30, 30, 30, 30, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ];
    }
}

export = Board