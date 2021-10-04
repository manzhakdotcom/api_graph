const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const db = require('./src/db');
const models = require('./src/models');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

require('dotenv').config();
const colors = require('colors');

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT || 4000;

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
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  },
});

server.applyMiddleware({ app, path: '/api' });

app.listen(PORT, () => {
  console.log(
    `🚀 GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
