import React from "react";
import BalanceUpdate from "./BalanceUpdate";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test('header renders with correct text', () => {
  const component = render(<BalanceUpdate userId={1}/>);
  const balanceHeader = component.getByTestId("balance-header")

  expect(balanceHeader.textContent).toBe("Balance:")
})

test('balance renders with zero as default balance', () => {
  const component = render(<BalanceUpdate userId={1}/>);
  const currentBalance = component.getByTestId("current-balance")

  expect(currentBalance.textContent).toBe("$ 0")
})
