import Board = require("../board/Board");

class Game{
    id : string
    createdAt: string
    startTime: string
    endTime: string
    boardOwnerId: Board
    boardGuestId: Board
}

export = Game;