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

  // connect click handlers to DB
  // more css

  render() {
    const routes = this.state.routes;

    return(
      <div id="routes-list-wrapper">
        <div id="routes-list-intro">Hi, {this.state.driverName}! Here are your listed routes for today, {this.state.date}:</div>
        <div id="list-headers"><span id="start">Start</span><span id="end">End</span><span id="departure">Departure</span><span id="seats">Seats</span></div>
        <div id="routes-list">
          <tbody id="routes-table">
            {routes.map((route, i) => {
              return(
                <tr key={i}>
                  <span className="cancel" onClick={this.cancelRoute}>X</span>
                  <td>{route.start}</td>
                  <td>{route.end}</td>
                  <td>{route.departure}</td>
                  <td>{route.seats}</td>
                </tr>
              );
            })}
          </tbody>
        </div>
      </div>
    );
  }
}

export default RoutesList;