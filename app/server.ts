import app from "./app";

import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import express from 'express';
import { readFileSync } from 'fs';

const  port = 9000;

const typeDefs = readFileSync('app/src/graphql/schema.graphql', {encoding: 'utf-8'});
const resolvers = require('./src/resolvers/resolvers');
const schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/graphql', graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:9000/subscriptions'
}));


const ws = createServer(app);

ws.listen(port, () => {
  console.log(`GraphQL Server is now running on http://localhost:${port}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});