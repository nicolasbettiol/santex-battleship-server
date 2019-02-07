import Board = require("../board/Board");

class Game{
    id : string
    createdAt: string
    startTime: string
    endTime: string
    boardOwnerId: string
    boardGuestId: string

    constructor(boardOwnerId){
        this.boardOwnerId = boardOwnerId;
    }
}

export = Game;