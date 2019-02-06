const db = require('../../db');

const Query = {
  game: (root, {id}) => db.games.get(id),
  player: (root, {id}) => db.players.get(id),
  boards: () => db.boards.list()
};

const Mutation = {
  createGame: (root, {input}) => {
    const id = db.games.create(input);
    return db.games.get(id);
  }
};

const Board = {
  player: (board) => db.players.get(board.playerId)
};

module.exports = { Query, Mutation, Board };
