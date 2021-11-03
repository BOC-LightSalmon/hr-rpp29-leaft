import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './components/SignUp.jsx';
import Main from './components/Main.jsx';
import Login from './components/SignUp/login.jsx';
import Register from './components/SignUp/register.jsx';
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
    const { signUp, login } = this.state;

    // if(this.state.redirect === '/register') {
    //   return(<Register redirect={this.handleRedirect}/>);
    // }
    // if(this.state.redirect === '/login') {
    //   return(<Login login={this.handleLoginEmail} redirect={this.handleRedirect} handleRedirect={this.handleRedirect}/>);
    // }
    // if (signUp === true) {
    //   return (<SignUp signUpHandle={this.signUpHandle}/>)
    // }
    // if (login === true) {
    //   return (<Main loginHandle={this.loginHandle} handleRedirect={this.handleRedirect}/>)
    // }

    // else {
    //   return (
    //     <div className="App">
    //       <h1>LEAFT</h1>
    //       <button onClick={this.loginHandle}>Login</button>
    //       <button onClick={this.signUpHandle}>Sign up</button>
    //     </div>
    //   )
    // }

    return (
      <Router>
        <Switch>

          <Route exact path="/">
            <Register/>
          </Route>
 
          <Route exact path="/login">
            <Login login={this.handleLoginEmail} redirect={this.handleRedirect} handleRedirect={this.handleRedirect}/>
          </Route>


        </Switch>
      </Router>

    )
  }
}

export default App;
