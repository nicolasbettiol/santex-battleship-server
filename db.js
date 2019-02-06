const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  boards: store.collection('boards'),
  games: store.collection('games'),
  players: store.collection('players')
};
