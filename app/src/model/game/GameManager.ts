import Game = require("./Game");
import Player = require("../player/Player");
import db  = require("../../../db");
import Board = require("../board/Board");

class GameManager{

    constructor(){

    }

    generateNewGame(input): string{
        const boardOwner = new Board(input.playerId);
        const boardOwnerId = db.boards.create(boardOwner); 
        const game = new Game(boardOwnerId);
        return db.games.create(game);
    }
}

export = GameManager;