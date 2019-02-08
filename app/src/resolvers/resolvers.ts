import { PubSub, withFilter } from "graphql-subscriptions";

import db = require('../../db');
import GameManager = require("../model/game/GameManager")
import BoardManager = require("../model/board/BoardManager")


const pubsub = new PubSub();
const gm = new GameManager();
const bm = new BoardManager();

const Query = {
  game: (root, {id}) => db.games.get(id),
  player: (root, {id}) => db.players.get(id),
  boards: () => db.boards.list(),
  players: () => db.players.list()
};

const Subscription = {
  newGameAdded: {
    subscribe: () => pubsub.asyncIterator(["NEW_GAME"])
  }
}

const Mutation = {
  createGame: (root, {input}) => {  
    const id = gm.generateNewGame(input); 

    pubsub.publish("NEW_GAME", { 
      newGameAdded : db.games.get(id)
    });

    return db.games.get(id);
  },
  joinGame: (root, {input}) => {  
    const gm = new GameManager();
    gm.joinPlayerToGame(input); 
    return db.games.get(input.gameId);
  },
  shot: (root, {input}) => {
    console.log(bm);
    bm.shot(input.boardId, input.x, input.y);
  }
};

const Board = {
  player: (board) => db.players.get(board.playerId)
};

const Game = {
  boardOwner: (game) => db.boards.get(game.boardOwnerId),
  boardGuest: (game) => db.boards.get(game.boardGuestId)
};

module.exports = { Query, Mutation, Board , Game, Subscription};