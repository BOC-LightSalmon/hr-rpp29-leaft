import React from "react";
import axios from 'axios';
import './routeForm.scss'

class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // change driver ID to login user ID
      driver_id: this.props.userData.id,
      pickUp: '',
      dropOff: '',
      departure: '',
      seats: '',
      date: ''
    };

    this.submitHandle = this.submitHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitHandle(event) {
    event.preventDefault();

    axios.post('/api/drivers/create', this.state)
      .then(() => {
        this.props.getRoutes();
        this.props.closeForm();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(event) {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value
    })
  }

  render() {
    return (
      <div className="driver-modal">
        <div id="close-button" onClick={this.props.closeForm}>X</div>
        <h2 id="form_title">Enter your ride info: </h2>
        <form className="route_form" onSubmit={this.submitHandle}>
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
          <table>
            <tbody>
              <tr>
                <td>Date:</td>
                <td> <input type="date" id="date"
                  value={this.state.date} onChange={this.handleChange} /></td>
              </tr>
              <tr>
                <td>Departure Time:</td>
                <td>
                  <input type="time" id="departure"
                    value={this.state.departure} onChange={this.handleChange} />
                </td>
              </tr>
              <tr>
                <td># of Seats:</td>
                <td>
                  <input type="number" id="seats" min="1" max="6"
                    value={this.state.seats} onChange={this.handleChange} />
                </td>
              </tr>
            </tbody>
          </table>
          <input id="submit_button" type="submit" value="Submit Ride" />
        </form>
      </div>
    );
  }
}

export default RouteForm;