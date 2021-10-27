import React from 'react';

// import Table from './Table';
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

  // format list using css/html
  // connect click handlers to DB
  // more css

  render() {
    return(
      <div id="routes-list-wrapper">
        <div id="routes-list-intro">Hi, {this.state.driverName}! Here are your listed routes for today, {this.state.date}:</div>
        <div id="list-headers">Start End Departure Seats</div>
        <div id="routes-list">
          {/* <Table /> */}
          {/* {this.state.routes.map((route, i) => {
            return(
              <div key={i} className="list-item"><span className="cancel" onClick={this.cancelRoute}>X</span> <span className="start">{route.start}</span> <span className="end">{route.end}</span> <span className="departure">{route.departure}</span> <span className="seats">{route.seats}</span></div>
            );
          })} */}
        </div>
      </div>
    );
  }
}

export default RoutesList;