import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import axios from 'axios';

import './register.scss';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      errorMessage: '',
      success: false
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  register(e) {
    e.preventDefault();
    if(!this.checkForm()) {
      alert('Please Fill Out The Entire form');
      return;
    };
    const {errorMessage, ...rest} = this.state;
    axios.post('/api/logins/register', rest).then((res) =>{
      this.props.login(res.data);
      this.setState({
        success: true
      })
      // this.props.redirect('/login');
    }).catch((err) => {
      console.log(err.response.data);
      this.setState({
        errorMessage: err.response.data
      })
    })
  }

   checkForm() {
    for(var keys in this.state) {
      if(this.state[keys] === '' && keys !== 'errorMessage') {
        return false;
      }
    }
    console.log('testing')
    return true;
   }
  render() {
    if (this.state.success) {
      return (
        <Redirect to='/' />
      )
    }
    return(
      <div id="register">
        <div className="wave">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
    </svg>
</div>
        <form onChange={() => {
          this.setState({
            errorMessage: ''
          })
        }} onSubmit={(e) => this.register(e)}>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' onChange={e => this.handleChange(e)} required></input>
          <br></br>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' onChange={e => this.handleChange(e)} required></input>
          <br></br>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email'onChange={e => this.handleChange(e)} required></input>
          <br></br>
          <label htmlFor='phone'>Phone Number</label>
          <input type='tel' id='phone'onChange={e => this.handleChange(e)} required></input>
          <br></br>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' minLength='6' onChange={e => this.handleChange(e)} required></input>
          <br></br>
          <input className="register-buttons" type='submit' value='Submit'></input>
          <h5 id="already-have-account">Already Have An Account?</h5>
        <NavLink className="register-buttons" id='nav' to="/login">Sign In</NavLink>
        </form>

        {/* <button className="register-buttons" onClick={() => {
          this.props.redirect('/login')
        }}>Sign In</button> */}
        {this.state.errorMessage !== '' && <h5>{this.state.errorMessage}</h5>}
      </div>
    )
  }
}

export default Register
