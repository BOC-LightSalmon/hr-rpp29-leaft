import React from 'react';
import SignUp from './components/SignUp.jsx';
import Main from './components/Main.jsx';
import Login from './components/SignUp/login.jsx';
import Register from './components/SignUp/register.jsx';
import './App.scss';


class App extends React.Component {
  constructor() {
    super();
    this.signUpHandle = this.signUpHandle.bind(this);
    this.loginHandle = this.loginHandle.bind(this);
    this.state = {
      signUp: false,
      login: false
    }
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
    // return(<Login/>);
    // return(<Register/>);
    if (signUp === true) {
      return (<SignUp signUpHandle={this.signUpHandle}/>)
    }
    if (login === true) {
      return (<Main loginHandle={this.loginHandle}/>)
    }

    else {
      return (
        <div className="App">
          <h1>LEAFT</h1>
          <button onClick={this.loginHandle}>Login</button>
          <button onClick={this.signUpHandle}>Sign up</button>
        </div>
      )
    }
  }
}

export default App;