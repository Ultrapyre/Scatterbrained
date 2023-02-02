const express = require('express');
const path = require('path');
const db = require('./config/connection');

const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth')


const app = express();
const PORT = process.env.PORT || 3001;
//Set up a new Apollo server using the schemas and the authentication middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//Send forward the main index.html file as the root.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//Starts up the Apollo Server, as well as the other stuff that was already there.
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({app})

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`)
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

//Kicks off the server start.
startApolloServer(typeDefs, resolvers)