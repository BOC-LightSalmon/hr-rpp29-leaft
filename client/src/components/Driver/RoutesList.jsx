import React from 'react';
import axios from 'axios';

import Table from './Table';

class RoutesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.cancelRoute = this.cancelRoute.bind(this);
    this.showRoute = this.showRoute.bind(this);
  }

  cancelRoute(e) {
    const routeId = e.target.id;

    axios.put(`/api/drivers/routes`, { routeId })
      .then(res => {
        this.props.getRoutes();
      })
      .catch(err => {
        console.log(err);
      });
  }

  showRoute(e) {
    const getRouteDetails = (e) => {
      e = e.parentNode.childNodes;

      console.log(e);

      const output = {
        id: e[0].id,
        pickUp: e[1].innerHTML,
        dropOff: e[2].innerHTML,
        departure: e[3].innerHTML
      };

      return output;
    };

    console.log('selected the following route:', getRouteDetails(e.currentTarget));

    // connect this click event to live-update the map
  }

  // more css to match wireframe, web/mobile etc

  render() {
    const date = new Date().toLocaleString('default', { month: 'long', weekday: 'long', day: 'numeric', year: 'numeric' });

    return(
      <div id="routes-list-wrapper">
        <div id="routes-list-intro">Hi, {this.props.driverName}! Here are your listed routes for today, {date}:</div>
        <div id="routes-list">
          <Table routes={this.props.routes} cancelRoute={this.cancelRoute} showRoute={this.showRoute}/>
        </div>
      </div>
    );
  }
}

export default RoutesList;