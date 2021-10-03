const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./src/db');
const models = require('./src/models');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

require('dotenv').config();
const colors = require('colors');

const DB_HOST = process.env.DB_HOST;
const port = process.env.PORT || 4000;

const app = express();
app.use(helmet());
app.use(cors());

db.connect(DB_HOST);

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      new Error('Session invalid');
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  },
});

server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
  console.log(
    `🚀 GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
