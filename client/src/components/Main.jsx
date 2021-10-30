import React from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import Driver from './Driver/Driver.jsx';
import Rider from './Rider/Rider'


const Main = () => {

   const match = useRouteMatch();

  return (
      <div>
        <Switch>  
          <Route exact path="/main">  
            <Link to="/">
              <button>BACK</button>
            </Link>
            <h3>Main page</h3>
            <Link to={`${match.url}/driver`}>
              <button>Driver</button>
            </Link>
            <Link to={`${match.url}/rider`}>
              <button>Rider</button>
            </Link>
          </Route>

          <Route path={`${match.url}/driver`}>
            <Driver />
          </Route>

          <Route path={`${match.url}/rider`}>
            <Rider />
          </Route>
          
        </Switch>
      </div>
    )
}

export default Main;