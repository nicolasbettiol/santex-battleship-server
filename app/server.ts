import app from "./app";
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import express from 'express';
import { readFileSync } from 'fs';

const  port = 9000;

const typeDefs = readFileSync('app/src/graphql/schema.graphql', {encoding: 'utf-8'});
const resolvers = require('./src/resolvers/resolvers');
const schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/graphql', graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(port, () => console.info(`Server started on port ${port}`));