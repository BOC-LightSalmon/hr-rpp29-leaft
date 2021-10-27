import React from 'react';

class RoutesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [],
      driverName: 'testDriverName',
      date: 'October 24th, 2021'
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
      routes: [
        {
          start: '1 Main St',
          end: '1 Oak St',
          departure: '1:00PM',
          seats: 3
        },
        {
          start: '5 Main St',
          end: '5 Oak St',
          departure: '5:00PM',
          seats: 3
        },
        {
          start: '10 Main St',
          end: '10 Oak St',
          departure: '10:00PM',
          seats: 3
        }
      ]
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
      <div>
        <h3>Routes List</h3>
        <div>Hi, {this.state.driverName}! Here are your listed routes for today, {this.state.date}</div>
        <div>Start End Departure Seats</div>
        {this.state.routes.map((route, i) => {
          return(
            <div key={i}><span className="cancel" onClick={this.cancelRoute}>X</span> {route.start}, {route.end}, {route.departure}, {route.seats}</div>
          );
        })}
      </div>
    );
  }
}

export default RoutesList;