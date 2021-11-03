import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import SignUp from './components/SignUp.jsx';
import Main from './components/Main.jsx';
import Login from './components/SignUp/login.jsx';
import Register from './components/SignUp/register.jsx';
import Driver from './components/Driver/Driver.jsx';
import Rider from './components/Rider/Rider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import BalanceTransfer from './components/Balance/BalanceTransfer.jsx';
import BalanceUpdate from './components/Balance/BalanceUpdate.jsx';
import './App.scss';


class App extends React.Component {
  constructor() {
    super();
    this.signUpHandle = this.signUpHandle.bind(this);
    this.loginHandle = this.loginHandle.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      signUp: false,
      login: false,
      redirect: '/register',
      email: '',
      first_name: '',
      last_name: '',
      id: '',
      balance: ''
    }
  }
  handleLogin(data) {
    console.log(data)
    for(var keys in data) {
      console.log('keys =', data[keys]);
      this.setState({
        [keys]: data[keys] === null ? 0 : data[keys]
      },() => console.log(this.state))
    }
  }

  handleRedirect(redirect) {
    this.setState({
      redirect: redirect
    })
  }

  signUpHandle() {
    this.setState({
      signUp: !this.state.signUp
    })
  }

  loginHandle() {
    this.setState({
      login: !this.state.login
    })
  }


  render() {
    const { id } = this.state;

    // const { signUp, login } = this.state;

    // if(this.state.redirect === '/register') {
    //   return(<Register redirect={this.handleRedirect} login={this.handleLogin}/>);
    // }
    // if(this.state.redirect === '/login') {
    //   if(this.state.email !== '') {
    //     return(<Login login={this.handleLogin} redirect={this.handleRedirect} isLoggedIn={true}/>);
    //   }
    //   return(<Login login={this.handleLogin} redirect={this.handleRedirect}/>);
    // }
    // if (signUp === true) {
    //   return (<SignUp signUpHandle={this.signUpHandle}/>)
    // }
    // if (login === true) {
    //   return (<Main loginHandle={this.loginHandle}/>)
    // }

    return (
      <Router>
        <Switch>
 
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register login={this.handleLogin}/>
          </Route>

          <PrivateRoute exact path="/" component={Main} userId={id} />
          <PrivateRoute exact path="/driver" component={Driver} userId={id} />
          <PrivateRoute exact path="/rider" component={Rider} userId={id} />
          <PrivateRoute exact path="/balance-update" component={BalanceUpdate} userId={id} />
          <PrivateRoute exact path="/balance-transfer" component={BalanceTransfer} userId={id} />

          <Route path="/">
            <div>404 Not Found</div>
          </Route>

        </Switch>
      </Router>

    )
  }
}

export default App;
