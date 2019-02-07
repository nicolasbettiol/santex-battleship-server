import Player = require("../player/Player");

class Board{
    id: string
    player: Player
    status: string
    board: number[][]
}

export = Board