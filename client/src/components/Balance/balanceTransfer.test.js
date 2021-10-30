import React from "react";
import BalanceUpdate from "./BalanceUpdate";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test('header renders with correct text', () => {
  const component = render(<BalanceUpdate userId={1}/>);
  const balanceHeader = component.getByTestId("balance-header")

  expect(balanceHeader.textContent).toBe("Balance:")
})
