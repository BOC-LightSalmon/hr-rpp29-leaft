import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './components/Main.jsx';
import Login from './components/SignUp/login.jsx';
import Register from './components/SignUp/register.jsx';
import Driver from './components/Driver/driver.test.js';
import Rider from './components/Rider/Rider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import BalanceTransfer from './components/Balance/BalanceTransfer.jsx';
import BalanceUpdate from './components/Balance/BalanceUpdate.jsx';
import './App.scss';

export const AuthContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleBalanceUpdate = this.handleBalanceUpdate.bind(this);
    this.state = {
      email: this.props.data?.email || '',
      first_name: this.props.data?.first_name || '',
      last_name: this.props.data?.last_name ||'',
      id: this.props.data?.id || '',
      balance: this.props.data?.balance || 0
    }

  }
  handleLogin(data) {
    for(var keys in data) {
      this.setState({
        [keys]: data[keys] === null ? 0 : data[keys]
      })
    }
  }

  handleBalanceUpdate(newBalance) {
    this.setState({
      balance: newBalance
    })
  }


  render() {
    const { id } = this.state;

    return (
      <Router>
          <Switch>

            <Route exact path="/login">
              <Login login={this.handleLogin}/>
            </Route>

            <Route exact path="/register">
              <Register login={this.handleLogin}/>
            </Route>

            <AuthContext.Provider value={this.state} >
              <PrivateRoute exact path="/" component={Main} userId={id} />
              <PrivateRoute exact path="/driver" component={Driver} userId={id} />
              <PrivateRoute exact path="/rider" component={Rider} userId={id} />
              <PrivateRoute exact path="/balance-update" component={BalanceUpdate} handleBalanceUpdate={this.handleBalanceUpdate} />
              <PrivateRoute exact path="/balance-transfer" component={BalanceTransfer} handleBalanceUpdate={this.handleBalanceUpdate}/>
            </AuthContext.Provider>

            <Route path="/">
              <div>404 Not Found</div>
            </Route>

          </Switch>
        </Router>
    )
  }
}

export default App;
