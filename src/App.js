import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UserContext from './UserContext';

import PrivateRoute from './routing/PrivateRoute';
import Benefits from './pages/Benefits';
import SignIn from './pages/SignIn';
import Benefit from './pages/Benefit';
import { ThemeProvider } from 'styled-components';
import appTheme from './theme/colors';

function App() {
  const [user, setUser] = useState(null);
  const [headers, setHeaders] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, headers, setHeaders }}>
      <ThemeProvider theme={appTheme}>
        <Router>
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <PrivateRoute exact path="/benefits" component={Benefits} />
            <PrivateRoute path="/benefits/:slug" component={Benefit} />
            <Redirect to="/benefits" />
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
