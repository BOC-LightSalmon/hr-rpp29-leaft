import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

import Main from '../Main.jsx';

import './login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.submitForm =this.submitForm.bind(this);

    this.state = {
      email: '',
      password: '',
      isLoggedIn: this.props.isLoggedIn || false,
      errorMessage: ''
    };
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  submitForm(e) {
    e.preventDefault();

    axios.post('/api/logins/login', this.state).then((results) => {
      this.props.login(results.data);
      this.setState({
        isLoggedIn: true
      })
      // redirect to main

    })
    // .catch((err) =>  {
    //   console.log(err.response);
    //   this.setState({
    //     errorMessage: err.response.data
    //   })
    // })
  }

  render() {
    if(!this.state.isLoggedIn) {
      return(
        <div id="login-register">
        <form onChange={() => {
          this.setState({
            errorMessage: ''
          })
        }} onSubmit={e => this.submitForm(e)}>
          <label htmlFor='login_email'>Email:</label>
          <input type='email' id='login_email' name='email' onChange={e => this.handleEmail(e)}></input>
          <br></br>
          <label htmlFor='login_password'>Password:</label>
          <input type='password' id='login_password' name='password' onChange={e => this.handlePassword(e)}></input>
          <br></br>
          <input type='submit' value='Submit' id="login-submit-button"></input>
        </form>
          <h5 id="new-here">New Here?</h5>
          <NavLink id="register-button" to="/register">Register</NavLink>
          {/* <button id="register-button" onClick={() => {
            this.props.redirect('/register');
          }}>Register</button>
          <button onClick={this.test.bind(this)}>test</button>
          }}>Register</button> */}
          {this.state.errorMessage !== '' && <h5>{this.state.errorMessage}</h5>}
        </div>
      )
    } else {
      // return (<Main loginHandle={() => this.setState({ isLoggedIn: false })} />)
      return (
        <Redirect to="/" />
      )

    }
  }
}

export default Login;