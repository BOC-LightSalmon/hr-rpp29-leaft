import React, { useState, useEffect } from 'react';
import CurrentBalance from './CurrentBalance.jsx';
import BalanceAPIutils from './BalanceAPIutils'

function BalanceTransfer({ userId }) {
  const [ currentBalance, setCurrentBalance ] = useState(0);
  const [ amount, setAmount ] = useState('');
  const [ driverEmail, setDriverEmail ] = useState('');

  const [ displayToggles, setDisplayToggles ] = useState({
    displayBalanceError: false,
    displaySelfError: false,
    displayNotFoundError: false,
    displaySuccessMessage: false,
    displayTipForm: true
  })

  const getUserBalance = async () => {
      const { data } = await BalanceAPIutils.getBalance(userId)
      setCurrentBalance(data);
  }

  const handleSend = async () => {
    try {
      setDisplayToggles({
        displayBalanceError: false,
        displaySelfError: false,
        displayNotFoundError: false,
        displaySuccessMessage: false,
        displayTipForm: true
      })

      if (amount > currentBalance) {
        setDisplayToggles({
          ...displayToggles,
          displayBalanceError: true,
          displaySelfError: false
        })
      } else {
        setDisplayToggles({...displayToggles, displayBalanceError: false})
        await BalanceAPIutils.transfer(userId, driverEmail, amount)
        setDisplayToggles({
          displaySuccessMessage: true,
          displayTipForm: false
        })
        getUserBalance()
      }
    } catch (err) {
      if (err.response.status === 405) {
        setDisplayToggles({...displayToggles, displaySelfError: true})
      }
      if (err.response.status === 404) {
        setDisplayToggles({...displayToggles, displayNotFoundError: true})
      }
    }
  }

  const handleBackToFormClick = () => {
    setDisplayToggles({
      displaySuccessMessage: false,
      displayTipForm: true
    })
  }

  useEffect(() => {
    getUserBalance();
  }, [])



  return (
    <div>
      <CurrentBalance currentBalance={currentBalance}/>
      {displayToggles.displayTipForm &&
        <div>
          <div>
            <label>Enter email address of driver:</label>
            <input
              value={driverEmail}
              onChange={(e) => setDriverEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Enter Tip Amount:</label>
            <input
              value={amount}
              type="number"
              min="0.00"
              step="0.01"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <button type="button" onClick={handleSend}>Send Tip</button>
          </div>
        </div>
      }
      {displayToggles.displayBalanceError &&
        <div className="balance-error">You cannot send more than your current balance</div>
      }
      {displayToggles.displaySelfError &&
        <div className="balance-error">You cannot send money to yourself</div>
      }
      {displayToggles.displayNotFoundError &&
        <div>
          <div className="balance-error">There is no user found with this email address</div>
          <div className="balance-error">Please Try Again</div>
        </div>
      }
      {displayToggles.displaySuccessMessage &&
        <div>
          <div>Success!</div>
          <div>You just send $ {amount} to {driverEmail}</div>
          <button type="button" onClick={handleBackToFormClick}>Back to Tip Form</button>
        </div>
      }
    </div>
  )
}

export default BalanceTransfer
