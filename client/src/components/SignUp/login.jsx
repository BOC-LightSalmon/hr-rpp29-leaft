import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
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
    if(this.state.email === '' || this.state.password === '') {
      alert('Please Fill Out The Entire Form');
    }
    axios.post('/api/logins/login', this.state).then((results) => {
      this.props.login(results.data);
      this.setState({
        isLoggedIn: true
      })
    })
    .catch((err) =>  {
      console.log(err.response);
      this.setState({
        errorMessage: err.response.data
      })
    })
  }

  render() {
    if(!this.state.isLoggedIn) {
      return(
        <div className='fpage'>
           <div className="wave">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
    </svg>
</div>
        <div id="login-register">
          <h4>Login</h4>
          <div id="login-form">
            <form onChange={() => {
              this.setState({
                errorMessage: ''
              })
            }} onSubmit={e => this.submitForm(e)}>
              {/* <label htmlFor='login_email'>Email:</label> */}
              <input type='email' id='login_email' placeholder="Email:" name='email' onChange={e => this.handleEmail(e)} required></input>
              <br></br>
              {/* <label htmlFor='login_password'>Password:</label> */}
              <input type='password' id='login_password' placeholder="Password:" name='password' minLength='6' onChange={e => this.handlePassword(e)} required></input>
              <br></br>
              <input type='submit' value='Submit' id="login-submit-button"></input>
            </form>
          </div>
        <div className='footer1'>
          <h5 id="new-here">New Here? <NavLink id="nav1" to="/register">Register</NavLink>
          </h5>
          <div className="custom-shape-divider-bottom-1636512691">
  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
  </svg>
</div>
        </div>
          {/* <button id="register-button" onClick={() => {
            this.props.redirect('/register');
          }}>Register</button>
          <button onClick={this.test.bind(this)}>test</button>
          }}>Register</button> */}
          {this.state.errorMessage !== '' && <h5>{this.state.errorMessage}</h5>}
        </div>
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