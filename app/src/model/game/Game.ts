import Board = require("../board/Board");
import date = require("../../util/date");
import GameStatus = require("./game.constants");

class Game{
    id : string
    createdAt: string
    startTime: string
    endTime: string
    boardOwnerId: string
    boardGuestId: string
    status: string
    lastTurn: string

    constructor(boardOwnerId){
        this.boardOwnerId = boardOwnerId;
        this.createdAt = date.getDate();
        this.status = GameStatus.CREATED.toString();
    }
}

export = Game;