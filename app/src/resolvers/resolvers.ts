import db = require('../../db');
import GameManager = require("../model/game/GameManager")

const Query = {
  game: (root, {id}) => db.games.get(id),
  player: (root, {id}) => db.players.get(id),
  boards: () => db.boards.list()
};

const Mutation = {
  createGame: (root, {input}) => {  
    const gm = new GameManager();
    const id = gm.generateNewGame(input); 
    return db.games.get(id);
  },
  joinGame: (root, {input}) => {  
    const gm = new GameManager();
    gm.joinPlayerToGame(input); 
    return db.games.get(input.gameId);
  }
};

const Board = {
  player: (board) => db.players.get(board.playerId)
};

const Game = {
  boardOwner: (game) => db.boards.get(game.boardOwnerId),
  boardGuest: (game) => db.boards.get(game.boardGuestId)
};

module.exports = { Query, Mutation, Board , Game };