import React from 'react';

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
      password: ''
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    },() => console.log(this.state))
  }

  register(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return(<div>
      <form onSubmit={(e) => this.register(e)}>
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
        <input type='submit' value='Submit'></input>
      </form>
      <h5>Already Have An Account? <button>Sign In</button></h5>
    </div>)
  }
}

export default Register