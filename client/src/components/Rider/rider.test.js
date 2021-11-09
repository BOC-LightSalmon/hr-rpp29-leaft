import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../App';
import Rider from './Rider';
import Map from './MapContainer'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import dummyData from './dummyRiderData';

describe('Rider component', () => {
  const Component = render(
    <AuthContext.Provider value={{ test: 'test' }}>
      <Router>
        <Rider userId={1} />
      </Router>
    </AuthContext.Provider>
  );

  it('should render', () => {
    expect(true).tobeTruthy();
  });
})