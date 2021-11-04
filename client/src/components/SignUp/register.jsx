import React from 'react';
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
      errorMessage: ''
    }
  }
  componentDidMount() {
    axios.get('/api/logins/')
  }
  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    },() => console.log(this.state))
  }

  register(e) {
    e.preventDefault();
    const {errorMessage, ...rest} = this.state
    axios.post('/api/logins/register', rest).then((res) =>{
      this.props.login(res.data);
      this.props.redirect('/login');
    }).catch((err) => {
      console.log(err.response.data);
      this.setState({
        errorMessage: err.response.data
      })
    })
  }

  render() {
    return(<div id="register">
      <form onChange={() => {
        this.setState({
          errorMessage: ''
        })
      }} onSubmit={(e) => this.register(e)}>
        <label htmlFor='firstName'>First Name</label>
        <input type='text' id='firstName' onChange={e => this.handleChange(e)}></input>
        <br></br>
        <label htmlFor='lastName'>Last Name</label>
        <input type='text' id='lastName' onChange={e => this.handleChange(e)}></input>
        <br></br>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email'onChange={e => this.handleChange(e)}></input>
        <br></br>
        <label htmlFor='phone'>Phone Number</label>
        <input type='phone' id='phone'onChange={e => this.handleChange(e)}></input>
        <br></br>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password'onChange={e => this.handleChange(e)}></input>
        <br></br>
        <input className="register-buttons" type='submit' value='Submit'></input>
      </form>
      <h5 id="already-have-account">Already Have An Account?</h5>
      <button className="register-buttons" onClick={() => {
        this.props.redirect('/login')
      }}>Sign In</button>
      {this.state.errorMessage !== '' && <h5>{this.state.errorMessage}</h5>}
    </div>)
  }
}

export default Register