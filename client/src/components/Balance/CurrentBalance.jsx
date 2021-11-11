import React from 'react';
import './balance.scss'

function CurrentBalance({ currentBalance }) {

  return (
    <div id="CurrentBalance">
      <h3>Current Balance:</h3>
      <h1>$ {currentBalance}</h1>
    </div>
  )
}

export default CurrentBalance
