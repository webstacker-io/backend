import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import fs from 'fs';

const typeDefs = [];
const resolvers = [];

// Dynamically import and combine schemas and resolvers
const schemaFiles = fs.readdirSync('./src/schema');
for (const file of schemaFiles) {
  const filePath = `./src/schema/${file}`;
  const schema = fs.readFileSync(filePath, 'utf-8');
  typeDefs.push(schema);
}

const resolverFiles = fs.readdirSync('./src/resolvers');
for (const file of resolverFiles) {
  const resolver = require(`./resolvers/${file}`);
  resolvers.push(resolver.default);
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
