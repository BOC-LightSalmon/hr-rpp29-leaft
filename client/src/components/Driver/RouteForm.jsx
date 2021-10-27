import React from "react";
import './routeForm.css'

class RouteForm extends React.Component {
  constructor() {
    super()
    this.submitHandle = this.submitHandle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      pickUp: '',
      dropOff: '',
      departure: '',
      seats: 1,
      date: '',
      zip: ''
    }
  }

  submitHandle(event) {

  }

  handleChange(event) {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value
    })
  }

  render() {
    return (
      <form className='route_form' onSubmit={this.submitHandle}>
        <label>
          Pick-Up Location:
          <br></br>
          <input type="text" id="pickUp"
            value={this.state.pickUp} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Drop-Off Location:
          <br></br>
          <input type="text" id="dropOff"
            value={this.state.dropOff} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          ZIP:
          <br></br>
          <input type="zipcode" id="zip"
            value={this.state.zip} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Date:
          <input type="date" id="date"
            value={this.state.date} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          Departure Time:
          <input type="time" id="departure"
            value={this.state.departure} onChange={this.handleChange} />
        </label>
        <br></br>
        <label>
          # of Seats:
          <input type="number" id="seats" min="1" max="6"
            onChange={this.handleChange} />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default RouteForm;