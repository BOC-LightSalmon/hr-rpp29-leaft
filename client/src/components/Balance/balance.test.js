import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../App";
import CurrentBalance from "./CurrentBalance";
import BalanceUpdate from "./BalanceUpdate";
import BalanceTransfer from "./BalanceTransfer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";


describe('Current Balance', () => {
  
  it('displays the correct balance', () => {
    render(<CurrentBalance currentBalance={'5.00'}/>);
    const balance = screen.getByRole('heading', {name: "$ 5.00"});
    expect(balance.textContent).toBe('$ 5.00')
  })
})

describe('Balance Update', () => {

  

  it('renders the correct balance', () => {
    render(
      <AuthContext.Provider value={{ balance: 5 }}>
        <Router>
          <BalanceUpdate />
        </Router>
      </AuthContext.Provider>
    )
  })
})

describe('Balance Transfer', () => {
  it('renders the correct balance', () => {
    render(
      <AuthContext.Provider value={{ balance: 5 }}>
        <Router>
          <BalanceTransfer />
        </Router>
      </AuthContext.Provider>
    )
  })
})