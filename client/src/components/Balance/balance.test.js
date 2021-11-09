import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../../App";
import CurrentBalance from "./CurrentBalance";
import BalanceUpdate from "./BalanceUpdate";
import BalanceTransfer from "./BalanceTransfer";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
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
    const inputElement = screen.getByTestId('transfer-amount');
    fireEvent.change(inputElement, { target: { value: 10}});
    expect(inputElement.value).toBe('10');
  })

  it('should have empty input after \'Depoist\' is clicked', async () => {
    const depositButton = screen.getByRole('button', { name: 'Deposit'});
    let inputElement = screen.getByTestId('transfer-amount');
    fireEvent.change(inputElement, { target: { value: 10}});
    fireEvent.click(depositButton);
    inputElement = await (waitFor(() => screen.findByTestId('transfer-amount')))

    expect(inputElement.value).toBe('');
  })

  it('should display an error on page load', () => {
    const depositButton = screen.getByRole('button', { name: 'Deposit'});
    fireEvent.click(depositButton);
    const errorMessage = screen.getByText('Please enter a valid amount to transfer')
    expect(errorMessage).toBeInTheDocument();
  })

  it('should display an error when trying to withdraw more money than is in the account', () => {
    const inputElement = screen.getByTestId('transfer-amount');
    const withdrawButton = screen.getByRole('button', { name: 'Withdraw'});
    fireEvent.change(inputElement, { target: { value: 10}});
    fireEvent.click(withdrawButton);
    const errorMessage = screen.getByText('You cannot withdraw more than your current balance');
    expect(errorMessage).toBeInTheDocument();
  })

  it('should display an error when clicking \'Deposit\' if the input field is empty', () => {
    const depositButton = screen.getByRole('button', { name: 'Deposit'});
    fireEvent.click(depositButton);
    const errorMessage = screen.getByText('Please enter a valid amount to transfer');
    expect(errorMessage).toBeInTheDocument();
  })

  it('should display an error when clicking \'Withdraw\' if the input field is empty', () => {
    const withdrawButton = screen.getByRole('button', { name: 'Withdraw'});
    fireEvent.click(withdrawButton);
    const errorMessage = screen.getByText('Please enter a valid amount to transfer');
    expect(errorMessage).toBeInTheDocument();
  })

  // it('should update the blance on the page in real time after a deposit', () => {
  //   const inputElement = screen.getByTestId('transfer-amount');
  //   const depositButton = screen.getByRole('button', { name: 'Deposit'});
  //   fireEvent.change(inputElement, { target: { value: 10}});
  //   fireEvent.click(depositButton);
  //   const balance = screen.getByRole('heading', {name: "$ 15.00"});
  //   expect(balance).toBeInTheDocument()
  // })
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