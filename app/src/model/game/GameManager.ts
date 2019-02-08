import { PubSub } from "graphql-subscriptions";

import Game = require("./Game");
import Player = require("../player/Player");
import db  = require("../../../db");
import Board = require("../board/Board");
import date = require("../../util/date");
import Subscriptions = require("../../resolvers/Subscriptions");

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

    checkGameStatus(boardId: string, gameId: string) : void{
        const playerBoard = <Board> db.boards.get(boardId);
        if(playerBoard.status === "SUNKEN"){
            const game = <Game> db.games.get(gameId);
            game.status = "FINISHED"

            Subscriptions.Instance.pubsub.publish("SHOT", { 
                shot : game
            });
            db.games.update(game);
        }
    }
}

export = GameManager;