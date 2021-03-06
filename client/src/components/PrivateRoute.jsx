import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';

function PrivateRoute({ component: Component, userId, handleBalanceUpdate, ...rest }) {

  const { id } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => {
        return id ? <Component userId={userId} handleBalanceUpdate={handleBalanceUpdate} {...props} /> : <Redirect to="/login"/>
      }}
    />
  )
}

export default PrivateRoute