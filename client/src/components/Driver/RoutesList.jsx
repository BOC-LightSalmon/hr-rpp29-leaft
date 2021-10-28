import React from 'react';
import dummyRoutes from './dummyData';

import Table from './Table';

class RoutesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [],
      driverName: 'testDriverName',
      date: new Date().toLocaleString('default', { month: 'long', weekday: 'long', day: 'numeric', year: 'numeric' })
    };

    this.cancelRoute = this.cancelRoute.bind(this);
    this.showRoute = this.showRoute.bind(this);
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

  showRoute(e) {
    const getRouteDetails = (e) => {
      const output = {
        start: e[1].innerHTML,
        end: e[2].innerHTML,
        departure: e[3].innerHTML
      };

      return output;
    };

    console.log('selected the following route:', getRouteDetails(e.currentTarget.childNodes));

    // connect this click event to live-update the map
  }

  // connect click handlers to DB
  // more css

  render() {
    return(
      <div id="routes-list-wrapper">
        <div id="routes-list-intro">Hi, {this.state.driverName}! Here are your listed routes for today, {this.state.date}:</div>
        <div id="routes-list">
          <Table routes={this.state.routes} cancelRoute={this.cancelRoute} showRoute={this.showRoute}/>
        </div>
      </div>
    );
  }
}

export default RoutesList;