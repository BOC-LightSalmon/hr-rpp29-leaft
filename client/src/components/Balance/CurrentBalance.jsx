import React from 'react';

function CurrentBalance({ currentBalance }) {

  return (
    <div data-testid="current-balance">
      <h3 data-testid="balance-header">Balance:</h3>
      <h5>$ {currentBalance}</h5>
    </div>
  )
}

export default CurrentBalance
