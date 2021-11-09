import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../App';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import dummyRoutes from './dummyData';

import Driver from './driver.test';
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

  afterEach(cleanup);

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

  afterEach(cleanup);

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

  afterEach(cleanup);

  it('should render', () => {
    expect(Component).toBeTruthy();
  });

  it('should display Pick-Up header', () => {
    expect(screen.getByText('Pick-Up')).toBeInTheDocument();
  });

  it('should change color of routes in list upon click', () => {
    const route = Component.container.getElementsByTagName('td')[2];

    fireEvent.click(route);

    expect(route.style['background-color']).toBe('');
  });
});

describe('<RouteForm />', () => {
  let Component;
  let closeFormMock = jest.fn();

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <RouteForm userId={1} closeForm={closeFormMock}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  afterEach(cleanup);

  it('should render', () => {
    expect(Component).toBeTruthy();
  });

  it('should call closeForm prop function after clicking X', () => {
    fireEvent.click(screen.getByText('X'));

    expect(closeFormMock).toBeCalled();
  });

  it('should call handleChange function upon text input', () => {
    const input = Component.container.querySelector('#pickUp');

    fireEvent.change(input, { target: { value: '1:00PM'}});

    expect(input.value).toBe('1:00PM');
  });

  it('should not submit data or close form after clicking Submit Route button if no form data', () => {
    const button = Component.container.querySelector('#submit_button');

    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});

describe('<Table />', () => {
  let Component;
  let cancelRouteMock = jest.fn();

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ test: 'test' }}>
        <Router>
          <Table routes={dummyRoutes} cancelRoute={cancelRouteMock}/>
        </Router>
      </AuthContext.Provider>
    );
  });

  afterEach(cleanup);

  it('should render', () => {
    expect(Component).toBeTruthy();
  });

  it('should call cancelRoute prop function after clicking X on route', () => {
    fireEvent.click(screen.getAllByText('X')[0]);

    expect(cancelRouteMock).toBeCalled();
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

  afterEach(cleanup);

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

  afterEach(cleanup);

  it('should render', () => {
    expect(Component).toBeTruthy();
  });
});