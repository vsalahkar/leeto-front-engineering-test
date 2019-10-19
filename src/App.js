import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect,
} from 'react-router-dom';
import UserContext from './UserContext';
import SignIn from './pages/SignIn';
import './App.css';

import Benefits from './pages/Benefits';
import PrivateRoute from './routing/PrivateRoute';

function App() {
  const [user, setUser] = useState(null);
  const [headers, setHeaders] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, headers, setHeaders }}>
      <Router>
        <Switch>
          <Route path="/sign-in" component={SignIn}/>
          <PrivateRoute path="/benefits" component={Benefits}/>
          <Redirect to="/benefits"/>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
