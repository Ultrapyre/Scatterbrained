import React from 'react';
//Router functionality, in one convenient package.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Functions to link to GraphQL.
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home.js'
import Profile from './pages/Profile.js'
import ActiveTasks from './pages/ActiveTasks'

import Navbar from './components/Navbar.js'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <>
          <Navbar />
            <Routes>
              <Route 
                path='/' 
                element={<Home />} 
              />
              <Route 
                path='/tasks' 
                element={<ActiveTasks />} 
              />
              <Route 
                path='/profile' 
                element={<Profile />} 
              />
              <Route 
                path='*'
                element={<h1 className='display-2'>Error: page not found. What are you doing here? :P</h1>}
              />
            </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
