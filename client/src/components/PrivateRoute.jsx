import React from 'react';
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, userId, ...rest }) {

  return (
    
    <Route 
      {...rest} 
      render={props => {
        console.log('render props:', props)
        return userId ? <Component userId={userId} {...props} /> : <Redirect to="/login"/>
      }}
    />
  )
}

export default PrivateRoute