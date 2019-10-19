import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../UserContext';

function PrivateRoute(props) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/sign-in"/>;
  }

  return <Route {...props} />;
}

export default PrivateRoute;
