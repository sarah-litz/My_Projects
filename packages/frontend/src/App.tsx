import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './components/Login';
import DataLog from './components/DataLog';
import { client } from './store/apollo';
import { HomePage } from './pages/Home';
import UserDataSettings from './pages/UserDataSettings';
import Register from './components/Register';
import Visualize from './pages/DataVis';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          {/* Like a regular switch statement for routes */}
          <Switch>
            <Route exact path="/">
              {/* <HomePage /> */}
              <HomePage />
            </Route>

            <Route exact path="/preferences">
              {/* <Preferences /> */}
              <UserDataSettings />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/logdata">
              <DataLog />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/visual">
              <Visualize />
            </Route>

            {/* Default route when is not found above (404 page) */}
            <Route>
              <Layout>404 Error</Layout>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
