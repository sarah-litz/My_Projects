import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { UserDataSettings } from './pages/user_data_settings';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Like a regular switch statement for routes */}
        <Switch>
          <Route exact path="/">
            {/* <HomePage /> */}
            <UserDataSettings />
          </Route>

          {/* Default route when is not found above (404 page) */}
          <Route>
            <Layout>404 Error</Layout>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
