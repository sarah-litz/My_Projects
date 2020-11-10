import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './components/Login';
import Data_Log from './components/Data_Log';
import { client } from './store/apollo';
import { UserDataSettings } from './pages/user_data_settings';
import Register from './components/Register';
import Visualize from './pages/datavis';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          {/* Like a regular switch statement for routes */}
          <Switch>
            <Route exact path="/">
              {/* <HomePage /> */}
              <UserDataSettings />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/logdata">
              <Data_Log />
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
