import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserContext from './UserContext';

import PrivateRoute from './routing/PrivateRoute';
import Benefits from './pages/Benefits';
import SignIn from './pages/SignIn';
import Benefit from './pages/Benefit';

function App() {
  const [user, setUser] = useState(null);
  const [headers, setHeaders] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, headers, setHeaders }}>
      <Router>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <PrivateRoute exact path="/benefits" component={Benefits} />
          <PrivateRoute path="/benefits/:slug" component={Benefit} />
          <Redirect to="/benefits" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
