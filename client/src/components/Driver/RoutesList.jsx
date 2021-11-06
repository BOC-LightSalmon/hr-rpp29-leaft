import React from 'react';
import axios from 'axios';

import Table from './Table';

class RoutesList extends React.Component {
  constructor(props) {
    super(props);

    this.cancelRoute = this.cancelRoute.bind(this);
    this.showRoute = this.showRoute.bind(this);
  }

  cancelRoute(e) {
    const row = e.currentTarget.parentNode;
    const rows = row.parentNode.childNodes;

    rows.forEach(row => {
      row.style['background-color'] = '';
    });

    this.props.selectRoute({});

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
    const target = e.currentTarget.parentNode.childNodes;
    const row = e.currentTarget.parentNode;
    const rows = row.parentNode.childNodes;

    rows.forEach(row => {
      row.style['background-color'] = '';
    });

    row.style['background-color'] = 'rgb(20, 213, 104)';

    const routeId = Number(target[0].id);

    this.props.routes.forEach(route => {
      if (route.id === routeId) {
        this.props.selectRoute(route);
        return;
      }
    });
  }

  render() {
    return(
      <div id="routes-list-wrapper">
        <div id="routes-list-intro">Hi, {this.props.driverName}! Here are your upcoming routes:</div>
        <div id="routes-list">
          <Table routes={this.props.routes} cancelRoute={this.cancelRoute} showRoute={this.showRoute}/>
        </div>
      </div>
    );
  }
}

export default RoutesList;