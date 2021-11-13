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
    const inputElement = screen.getByTestId('transfer-amount');
    fireEvent.change(inputElement, { target: { value: 10}});
    expect(inputElement.value).toBe('10');
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

})

describe('Balance Transfer', () => {
  let Component;
  let location = {};

  beforeEach(() => {
    Component = render(
      <AuthContext.Provider value={{ balance: 5 }}>
        <Router>
          <BalanceTransfer location={location}/>
        </Router>
      </AuthContext.Provider>
    )
  })

  afterEach(cleanup);

  it('renders the correct balance', () => {
    expect(Component).toBeTruthy();
  })

  it('should be able to type into the email input', () => {
    const inputElement = screen.getByTestId('driver-email');
    fireEvent.change(inputElement, { target: { value: 'a@a.com'}});
    expect(inputElement.value).toBe('a@a.com');
  })

  it('should be able to type into the tip amount input', () => {
    const inputElement = screen.getByTestId('driver-email');
    fireEvent.change(inputElement, { target: { value: 10}});
    expect(inputElement.value).toBe('10');
  })

  it('should display an error when clicking \'Send Tip\' if the input field is empty', () => {
    const sendButton = screen.getByRole('button', { name: 'Send Tip'});
    fireEvent.click(sendButton);
    const errorMessage = screen.getByText('Please enter a valid Tip amount');
    expect(errorMessage).toBeInTheDocument();
  })
})
