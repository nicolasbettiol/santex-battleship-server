import Game = require("./Game");
import Player = require("../player/Player");
import db  = require("../../../db");
import Board = require("../board/Board");
import date = require("../../util/date");

class GameManager{

    constructor(){
    }

    generateNewGame({playerId}): string{
        const boardOwner = new Board(playerId);
        const boardOwnerId = db.boards.create(boardOwner); 
        const game = new Game(boardOwnerId);
        return db.games.create(game);
    }

    joinPlayerToGame({playerId, gameId}): void{
        const boardGuest = new Board(playerId);
        const boardGuestId = db.boards.create(boardGuest);
        const game = <Game> db.games.get(gameId);
        game.startTime = date.getDate();
        game.boardGuestId = boardGuestId;
        db.games.update(game);
    }
}

export = GameManager;