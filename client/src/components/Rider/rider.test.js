import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../App';
import Rider from './Rider';
import MapContainer from './MapContainer';
import RideList from './RideList';
import SelectedRide from './SelectedRide';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import dummyData from './dummyRiderData';

describe('Rider component', () => {
  let Component;
  const userData = {balance: 2, id: 1};
    beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={ userData }>
        <Router>
          <Rider />
        </Router>
      </AuthContext.Provider>
    );
  });

  afterEach(cleanup);

  it('Rider renders without crashing', () => {
    expect(Component).toBeTruthy();
  });
});


describe('Map', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ balance: 2 }}>
        <Router>
          <MapContainer />
        </Router>
      </AuthContext.Provider>
    );
  });

  afterEach(cleanup);

  it('should render without crashing', () => {
    expect(Component).toBeTruthy();
  });
});

describe('RideList component', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <RideList nearbyRides={dummyData}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  afterEach(cleanup);

  it('RideList renders without crashing', () => {
    expect(Component).toBeTruthy();
  });
});

// describe('SelectedRide Component', () => {
//   let Component;

//   beforeEach(() => {
//     Component = render(
//       <AuthContext.Provider value={{ balance: 2 }}>
//         <Router>
//           <SelectedRide />
//         </Router>
//       </AuthContext.Provider>
//     );
//   });

//   afterEach(cleanup);

//   it('SelectedRide renders without crashing', () => {
//     expect(Component).toBeTruthy();
//   });
// });