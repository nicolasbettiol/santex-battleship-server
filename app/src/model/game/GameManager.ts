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
        console.log("New game created for player id "+ playerId);
        return db.games.create(game);
    }

    joinPlayerToGame({playerId, gameId}): void{
        const boardGuest = new Board(playerId);
        const boardGuestId = db.boards.create(boardGuest);
        const game = <Game> db.games.get(gameId);
        game.startTime = date.getDate();
        game.boardGuestId = boardGuestId;
        game.status = "PLAYING";
        db.games.update(game);
        console.log("Player id "+playerId+" join to game");
    }
}

export = GameManager;