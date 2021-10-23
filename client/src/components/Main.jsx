import React from 'react';
import Driver from './Driver';
import Rider from './Rider'

class Main extends React.Component {
  constructor(props){
    super(props);
    this.driverHandle = this.driverHandle.bind(this)
    this.riderHandle = this.riderHandle.bind(this)
    this.state = {
      driver: false,
      rider: false 
    }
  }

  driverHandle () {
    this.setState ({
      driver: !this.state.driver
    })
  }

  riderHandle () {
    console.log(this.state.rider)
    this.setState ({
      rider: !this.state.rider
    })
  }

  render () {
    const {driver, rider} = this.state;
    if(driver === true) {
      return (<Driver driverHandle={this.driverHandle}/>)
    }
    if(rider === true) {
      return (<Rider riderHandle={this.riderHandle}/>)
    }
    return (
      <div>
        <button onClick={this.props.loginHandle}>BACK</button>
        <h3>Main page</h3>
        <button onClick={this.driverHandle}>Driver</button>
        <button onClick={this.riderHandle}>Rider</button>
      </div>
    )
  }
}

export default Main;