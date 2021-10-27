import React from 'react';
import dummyRoutes from './dummyData';

class RoutesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [],
      driverName: 'testDriverName',
      date: new Date().toLocaleString('default', { month: 'long', weekday: 'long', day: 'numeric', year: 'numeric' })
    };
  }

  componentDidMount() {
    this.getRoutes();
  }

  getRoutes() {
    console.log('fetched routes');
    // fetch routes from DB, set routes state with results

    // dummy data for now
    this.setState({
      routes: dummyRoutes
    });
  }

  cancelRoute() {
    console.log('route cancelled');

    // send delete request to DB for given routeId
    // fetch routes from DB
  }

  // delete placeholder title once component is more fleshed out
  // format list using css/html
  // add necessary text formatting
  // connect click handlers to DB
  // more css

  render() {
    return(
      <div id="routes-list-wrapper">
        <div id="routes-list-intro">Hi, {this.state.driverName}! Here are your listed routes for today, {this.state.date}:</div>
        <div>Start End Departure Seats</div>
        <div id="routes-list">
          {this.state.routes.map((route, i) => {
            return(
              <div key={i}><span className="cancel" onClick={this.cancelRoute}>X</span> {route.start}, {route.end}, {route.departure}, {route.seats}</div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default RoutesList;