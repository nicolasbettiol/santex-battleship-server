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
        game.lastTurn = playerId;
        console.log("New game created for player id "+ playerId);
        return db.games.create(game);
    }

    joinPlayerToGame({playerId, gameId}): void{
        const game = <Game> db.games.get(gameId);
        if(game.boardGuestId){
            return;
        }
        const boardGuest = new Board(playerId);
        boardGuest.status = "PLAYING";
        const boardGuestId = db.boards.create(boardGuest);
        game.startTime = date.getDate();
        game.boardGuestId = boardGuestId;
        game.status = "PLAYING";
        const boardOwner = <Board> db.boards.get(game.boardOwnerId);
        boardOwner.status = "PLAYING";
        db.games.update(game);
        console.log("Player id "+playerId+" join to game");
    }

    checkGameStatus(boardId: string, gameId: string) : void{
        const playerBoard = <Board> db.boards.get(boardId);
        const game = <Game> db.games.get(gameId);
        game.lastTurn = playerBoard.playerId;
        if(playerBoard.status === "SUNKEN"){
            game.status = "FINISHED"
            db.games.update(game);
        }
        Subscriptions.Instance.pubsub.publish("SHOT", { 
            shot : game
        });
    }
}

export = GameManager;