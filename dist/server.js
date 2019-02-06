"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_tools_1 = require("graphql-tools");
const fs_1 = require("fs");
const port = 9000;
const typeDefs = fs_1.readFileSync('lib/src/graphql/schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./src/resolvers/resolvers');
const schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
app_1.default.use('/graphql', apollo_server_express_1.graphqlExpress({ schema }));
app_1.default.use('/graphiql', apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
app_1.default.listen(port, () => console.info(`Server started on port ${port}`));
//# sourceMappingURL=server.js.map