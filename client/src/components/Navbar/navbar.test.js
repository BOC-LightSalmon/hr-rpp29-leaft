import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../App";
import Navbar from "./Navbar";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe('Navbar', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ balance: 5 }}>
        <Router>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    )
  })

  afterEach(cleanup);
  
  it('displays the correct balance', () => {
    const balanceEntry = screen.getByRole('link', { name: 'Balance: $5.00'});
    expect(balanceEntry).toBeInTheDocument();
  })

  it('displays Home link', () => {
    const navItem = screen.getByTestId('navbar-Home');
    expect(navItem).toBeInTheDocument();
  })

  it('displays Driver link', () => {
    const navItem = screen.getByTestId('navbar-Driver');
    expect(navItem).toBeInTheDocument();
  })

  it('displays Rider link', () => {
    const navItem = screen.getByTestId('navbar-Rider');
    expect(navItem).toBeInTheDocument();
  })

  it('displays Balance link', () => {
    const navItem = screen.getByTestId('navbar-Balance');
    expect(navItem).toBeInTheDocument();
  })

  it('displays Tip Driver link', () => {
    const navItem = screen.getByTestId('navbar-Tip Driver');
    expect(navItem).toBeInTheDocument();
  })
})
