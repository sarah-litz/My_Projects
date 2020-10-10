import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Like a regular switch statement for routes */}
        <Switch>
          <Route exact path="/">
            <HomePage />
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
