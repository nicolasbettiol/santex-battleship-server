import Player = require("../player/Player");
import Ship = require("./Ship");
import BoardStatus = require("./board.constants");
class Board{
    id: string
    playerId: string
    status: string
    board: number[][]
    ships: Ship[]

    constructor(playerId){
        this.playerId = playerId;
        this.status = BoardStatus.CREATED.toString();
        this.ships = new Array<Ship>();
        // TODO: use Ship objects
        // All ship has a value equals or bigger than 10. 
        // Each ship is represent with the values 10, 20, 30 or 40
        // When a cell is hitted, this value pass to negative ( the value multiplication by -1)
        // If you dont have any value bigger than 10 in board, means that all your ships are sunk
        this.board = [
            [20, 20, 20, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 50, 50, 0, 0],
            [90, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 10, 0, 100, 0, 0, 40, 0],
            [0, 0, 0, 10, 0, 0, 0, 0, 40, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 40, 0],
            [0, 70, 0, 0, 0, 0, 80, 0, 0, 0],
            [0, 0, 60, 60, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 30, 30, 30, 30, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ];
    }
}

export = Board