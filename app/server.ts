import app from "./app";

import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServer, gql } from 'apollo-server-express';
import { readFileSync } from 'fs';

const  PORT = 9000;
const http = require('http');
var httpServer = http.createServer(app);

const resolvers = require('./src/resolvers/resolvers');
const typeDefs =  gql`${readFileSync('app/src/graphql/schema.graphql', 'utf8')}`;

const apollo = new ApolloServer({typeDefs, resolvers});
apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:9000${apollo.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`)
})