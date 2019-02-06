import { DataStore } from 'notarealdb';

const store = new DataStore('data/');

export = {
  boards: store.collection('boards'),
  games: store.collection('games'),
  players: store.collection('players')
};
