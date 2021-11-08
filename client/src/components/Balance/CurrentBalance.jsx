import React from 'react';
import './balance.scss'

function CurrentBalance({ currentBalance }) {

  return (
    <div>
      <h3 data-testid="balance-header">Current Balance:</h3>
      <h1 data-testid="current-balance">$ {currentBalance}</h1>
    </div>
  )
}

export default CurrentBalance
