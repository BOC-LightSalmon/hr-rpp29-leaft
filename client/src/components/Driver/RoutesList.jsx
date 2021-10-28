import React from 'react';
import dummyRoutes from './dummyData';
import axios from 'axios';

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
    axios.get('http://localhost:5000/api/drivers/routes')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // dummy data for now
    this.setState({
      routes: dummyRoutes
    });
  }

  cancelRoute(e) {
    console.log('cancelled the following route: id', e.target.id);

    // send delete request to DB for given routeId
    // fetch routes from DB
    this.getRoutes();
  }

  showRoute(e) {
    const getRouteDetails = (e) => {
      e = e.parentNode.childNodes;

      const output = {
        id: e[0].id,
        start: e[1].innerHTML,
        end: e[2].innerHTML,
        departure: e[3].innerHTML
      };

      return output;
    };

    console.log('selected the following route:', getRouteDetails(e.currentTarget));

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