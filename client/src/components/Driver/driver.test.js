import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import dummyRoutes from './dummyData';

import Driver from './Driver';
import Map from './Map';
import RoutesList from './RoutesList';
import RouteForm from './RouteForm';
import Table from './Table';
import Confirm from './Confirm';
import Cancel from './Cancel';

describe('<Driver />', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <Driver userId={1}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  it('should render', () => {
    expect(Component).toBeTruthy();
  });

  it('should display "Loading..." if routes not fetched yet', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

describe('<Map />', () => {
  let Component;

  beforeEach(() => {
    document.body.innerHTML = `
    <div id="routes-list"></div>
    `;

    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <Map routes={dummyRoutes} selectedRoute={dummyRoutes[0]}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  it('should render', () => {
    expect(Component).toBeTruthy();
  });
});

describe('<RoutesList />', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <RoutesList routes={dummyRoutes} driverName={'testDriverName'}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  it('should render', () => {
    expect(Component).toBeTruthy();
  });
});

describe('<RouteForm />', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <RouteForm userId={1}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  it('should render', () => {
    expect(Component).toBeTruthy();
  });
});

describe('<Table />', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <Table routes={dummyRoutes}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  it('should render', () => {
    expect(Component).toBeTruthy();
  });
});

describe('<Confirm />', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <Confirm
          notificationData={{
            route: dummyRoutes[0],
            riderName: 'testRiderName'
          }}

          userData={{
              first_name: 'testFirstName',
              last_name: 'testLastName'
          }}
          />
        </Router>
      </AuthContext.Provider>
    );
  });

  it('should render', () => {
    expect(Component).toBeTruthy();
  });
});

describe('<Cancel />', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <Cancel
          notificationData={{
            route: dummyRoutes[0],
            riderName: 'testRiderName'
          }}

          userData={{
              first_name: 'testFirstName',
              last_name: 'testLastName'
          }}
          />
        </Router>
      </AuthContext.Provider>
    );
  });

  it('should render', () => {
    expect(Component).toBeTruthy();
  });
});