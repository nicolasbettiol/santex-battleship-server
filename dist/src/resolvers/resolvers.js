"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../db");
const GameManager_1 = __importDefault(require("../model/game/GameManager"));
const Query = {
    game: (root, { id }) => db.games.get(id),
    player: (root, { id }) => db.players.get(id),
    boards: () => {
        const gm = new GameManager_1.default();
        console.log(gm.generateNewGame());
        return db.boards.list();
    }
};
const Mutation = {
    createGame: (root, { input }) => {
        const id = db.games.create(input);
        return db.games.get(id);
    }
};
const Board = {
    player: (board) => db.players.get(board.playerId)
};
const Game = {
    boardOwner: (game) => db.boards.get(game.boardOwnerId)
};
module.exports = { Query, Mutation, Board, Game };
//# sourceMappingURL=resolvers.js.map