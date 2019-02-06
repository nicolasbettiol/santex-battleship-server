"use strict";
const notarealdb_1 = require("notarealdb");
const store = new notarealdb_1.DataStore('data/');
module.exports = {
    boards: store.collection('boards'),
    games: store.collection('games'),
    players: store.collection('players')
};
//# sourceMappingURL=db.js.map