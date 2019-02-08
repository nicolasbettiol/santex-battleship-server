import Board = require("../board/Board");
import date = require("../../util/date");

class Game{
    id : string
    createdAt: string
    startTime: string
    endTime: string
    boardOwnerId: string
    boardGuestId: string
    status: string

    constructor(boardOwnerId){
        this.boardOwnerId = boardOwnerId;
        this.createdAt = date.getDate();
        this.status = "CREATED";
    }
}

export = Game;