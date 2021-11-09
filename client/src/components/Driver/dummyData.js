const dummyRoutes = [
  {
    driver_id: 1,
    rider_id: null,
    departure: '1:00PM',
    date: new Date(),
    pickUp: 'Times Square, NY',
    dropOff: 'Union Square, NY',
    seats: 3,
    latPickUp: 50,
    lngPickUp: 51,
    latDropOff: 20,
    lngDropOff: 21,
    confirmed: false
  },
  {
    driver_id: 2,
    rider_id: null,
    departure: '5:00PM',
    date: new Date(),
    pickUp: 'Empire State Building, NY',
    dropOff: 'Marcus Garvey Park, NY',
    seats: 2,
    latPickUp: 49,
    lngPickUp: 50,
    latDropOff: 19,
    lngDropOff: 20,
    confirmed: true
  }
];

export default dummyRoutes;