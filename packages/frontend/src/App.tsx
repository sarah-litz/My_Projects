import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './components/Login';
import { client } from './store/apollo';
import { UserDataSettings } from './pages/user_data_settings';

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
