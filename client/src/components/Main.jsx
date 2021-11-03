import React from 'react';
import Driver from './Driver/Driver.jsx';
import Rider from './Rider/Rider';

import './main.scss';


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
      return (<Driver driverHandle={this.driverHandle} redirect={this.handleRedirect}/>)
    }
    if(rider === true) {
      return (<Rider riderHandle={this.riderHandle} redirect={this.handleRedirect}/>)
    }
    return (
      <div>
        {/* <button onClick={this.props.loginHandle}>BACK</button> */}
        <p><i onClick={this.props.loginHandle} className="arrow left"></i></p>
        <div id="main-page-buttons">
        <button className="main-page-button" onClick={this.driverHandle}>Driver</button>
        <button className="main-page-button" onClick={this.riderHandle}>Rider</button>
        </div>
      </div>
    )
  }
}

export default Main;