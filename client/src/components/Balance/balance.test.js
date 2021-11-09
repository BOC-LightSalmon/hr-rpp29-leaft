import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../App";
import CurrentBalance from "./CurrentBalance";
import BalanceUpdate from "./BalanceUpdate";
import BalanceTransfer from "./BalanceTransfer";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe('Current Balance', () => {
  
  it('displays the correct balance', () => {
    render(<CurrentBalance currentBalance={'5.00'}/>);
    const balance = screen.getByRole('heading', {name: "$ 5.00"});
    expect(balance.textContent).toBe('$ 5.00')
  })
})

describe('Balance Update', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ balance: 5 }}>
        <Router>
          <BalanceUpdate />
        </Router>
      </AuthContext.Provider>
    )
  })

  afterEach(cleanup);

  it('should be able to type into the input', () => {
    const inputElement = screen.getByTestId('transfer-amount')
    screen.debug()
  })
})


describe('Balance Transfer', () => {
  let Component;

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ balance: 5 }}>
        <Router>
          <BalanceTransfer />
        </Router>
      </AuthContext.Provider>
    )
  })

  afterEach(cleanup);

  it('renders the correct balance', () => {
    expect(Component).toBeTruthy();
  })
})