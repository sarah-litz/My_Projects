import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './components/Login';
import DataLog from './components/DataLog';
import { client } from './store/apollo';
import { HomePage } from './pages/Home';
import { UserDataSettings } from './pages/UserDataSettings';
import Register from './components/Register';
import AccountSettings from './pages/AccountSettings'
import Visualize from './pages/DataVis';
import { Logout } from './components/Logout';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          {/* Like a regular switch statement for routes */}
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>


            <Route exact path="/AccountSettings">
              <AccountSettings />
            </Route>
            
            
            <PrivateRoute exact path="/logdata">
              <DataLog />
            </PrivateRoute>

            <PrivateRoute exact path="/preferences">
              {/* <Preferences /> */}
              <UserDataSettings />
            </PrivateRoute>

            <PrivateRoute exact path="/visual">
              <Visualize />
            </PrivateRoute>

            <PrivateRoute exact path="/logout">
              <Logout />
            </PrivateRoute>

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
