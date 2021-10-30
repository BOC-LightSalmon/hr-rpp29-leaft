import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Main from './components/Main.jsx';
import './App.scss';


class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route path="/main" >
            <Main />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/">
            <div className="App">
              <h1>LEAFT</h1>
              <Link to="/main">
                <button>Login</button>
              </Link>
              <Link to="signup">
                <button>Sign up</button>
              </Link>
            </div>
          </Route>
          
        </Switch>
      </Router>
    )
  }
}

export default App;
