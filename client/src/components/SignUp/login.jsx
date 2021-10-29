import React from 'react';
import axios from 'axios';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.submitForm =this.submitForm.bind(this);
    this.state = {
      email: '',
      password: ''
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
    console.log('clicked');
  }
  render() {
    return(
      <div>
      <form onSubmit={e => this.submitForm(e)}>
        <label htmlFor='login_email'>Email:</label>
        <input type='email' id='login_email' name='email' onChange={e => this.handleEmail(e)}></input>
        <br></br>
        <label htmlFor='login_password'>Password:</label>
        <input type='password' id='login_password' name='password' onChange={e => this.handlePassword(e)}></input>
        <br></br>
        <input type='submit' value='Submit'></input>
      </form>
        <h5>New Here? <button>Register</button></h5>
      </div>
    )
  }
}

export default Login;