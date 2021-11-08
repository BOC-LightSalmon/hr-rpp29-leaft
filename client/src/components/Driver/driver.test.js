import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Driver from './Driver';

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
  it ('should pass', () => {
    expect(1).toEqual(1);
  });
});

describe('<RoutesList />', () => {
  it ('should pass', () => {
    expect(1).toEqual(1);
  });
});

describe('<RouteForm />', () => {
  it ('should pass', () => {
    expect(1).toEqual(1);
  });
});

describe('<Table />', () => {
  it ('should pass', () => {
    expect(1).toEqual(1);
  });
});