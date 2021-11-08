import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('<Driver />', () => {
  it ('should pass', () => {
    expect(1).toEqual(1);
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