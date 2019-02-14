import Game = require("./Game");
import db  = require("../../../db");
import Board = require("../board/Board");
import date = require("../../util/date");
import Subscriptions = require("../../resolvers/Subscriptions");
import GameStatus = require("./game.constants");
import BoardStatus = require("../board/board.constants");


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
        const boardOwner = <Board> db.boards.get(game.boardOwnerId);
        if(game.boardGuestId || (playerId === boardOwner.playerId)){
            return;
        }
        const boardGuest = new Board(playerId);
        boardGuest.status = BoardStatus.PLAYING.toString();
        const boardGuestId = db.boards.create(boardGuest);
        game.startTime = date.getDate();
        game.boardGuestId = boardGuestId;
        game.status = GameStatus.PLAYING.toString();
        boardOwner.status = BoardStatus.PLAYING.toString();
        db.games.update(game);
        console.log("Player id "+playerId+" join to game");
    }

    checkGameStatus(boardId: string, gameId: string) : void{
        const playerBoard = <Board> db.boards.get(boardId);
        const game = <Game> db.games.get(gameId);
        game.lastTurn = playerBoard.playerId;
        if(playerBoard.status ===  BoardStatus.SUNKEN.toString()){
            game.status = GameStatus.FINISHED.toString();
            db.games.update(game);
        }
        Subscriptions.Instance.pubsub.publish("SHOT", { 
            shot : game
        });
    }

    getPlayerGames(id: string) : Game[] {
        var gamesResult = [];

        var allGames = <Game[]>db.games.list();

        allGames.forEach((game) => {
            const boardGuest = <Board> db.boards.get(game.boardGuestId);
            const boardOwner = <Board> db.boards.get(game.boardOwnerId);
            if( (boardGuest && boardGuest.playerId === id) || (boardOwner && boardOwner.playerId === id)){
                gamesResult.push(game);
            }
        });
        
        return gamesResult;
    }
}

export = GameManager;