import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../App.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import CurrentBalance from './CurrentBalance.jsx';
import BalanceAPIutils from './BalanceAPIutils'

function BalanceTransfer({handleBalanceUpdate, location}) {
  const [ amount, setAmount ] = useState('');
  const [ driverEmail, setDriverEmail ] = useState('');
  const [ displayBalanceError, setDisplayBalanceError ] = useState(false);
  const [ displaySelfError, setDisplaySelfError ] = useState(false);
  const [ displayNotFoundError, setDisplayNotFoundError ] = useState(false);
  const [ displaySuccessMessage, setDisplaySuccessMessage ] = useState(false);
  const [ displayTipForm, setDisplayTipForm ] = useState(true);
  const [ displayZeroError, setDisplayZeroError ] = useState(false);

  const userData = useContext(AuthContext);

  useEffect(() => {
    
    if ('email' in location) {
      setDriverEmail(location.email)
    };
  }, [location]);

  const handleSend = async () => {
    try {
      setDisplaySuccessMessage(false)
      setDisplaySelfError(false);
      setDisplayNotFoundError(false);
      setDisplayZeroError(false)
      if (amount > userData.balance) {
        setDisplayBalanceError(true);
        return
      } 

      if (!amount || amount <= 0) {
        setDisplayZeroError(true);
        return
      } 

      setDisplayBalanceError(false)
      await BalanceAPIutils.transfer(userData.id, driverEmail, amount)
      setDisplaySuccessMessage(true)
      setDisplayTipForm(false)
      handleBalanceUpdate(userData.balance - parseFloat(amount))

      
    } catch (err) {
      console.log(err.message)
      if (err.response.status === 405) {
        setDisplaySelfError(true)
      }
      if (err.response.status === 404) {
        setDisplayNotFoundError(true)
      }
    }
  }

  const handleBackToFormClick = () => {
    setDisplayTipForm(true);
    setDisplaySuccessMessage(false)
  }

  return (
    <div className="balance">
      <Navbar />
      <CurrentBalance currentBalance={userData.balance.toFixed(2)}/>
      {displayTipForm &&
        <div>
          <div className="balance-form">
            <div>
              <label className="balance-instructions">Enter email address of driver</label>
              <div>
                <input
                  data-testid="driver-email"
                  className={displayNotFoundError ? "input-error" : ""}
                  value={driverEmail}
                  onChange={(e) => {
                    setDriverEmail(e.target.value)
                    setDisplayNotFoundError(false)
                  }
                }
                />
              </div>
              {displayNotFoundError &&
                <div>
                  <div className="balance-error">There is no user found with this email address</div>
                  <div className="balance-error">Please Try Again</div>
                </div>
              }
            </div>
            <div>
              <label className="balance-instructions">Enter Tip Amount</label>
              <div>
                <input
                  data-testid="tip-amount"
                  className={displayZeroError || displayBalanceError ? "input-error" : ""}
                  value={amount}
                  type="number"
                  min="0.00"
                  step="0.01"
                  onChange={(e) => {
                      setAmount(e.target.value)
                      setDisplayBalanceError(false);
                      setDisplayZeroError(false);
                    }
                  }
                />
              </div>
              {displayZeroError &&
                <div className="balance-error">Please enter a valid Tip amount</div>
              }
              {displayBalanceError &&
                <div className="balance-error">You cannot send more than your current balance</div>
              }
              {displaySelfError &&
                <div className="balance-error">You cannot send money to yourself</div>
              }
            </div>
          </div>
          <div>
            <button type="button" className="transfer-button" onClick={handleSend}>Send Tip</button>
          </div>
        </div>
      }
      {displaySuccessMessage &&
        <div>
          <div className="balance-success">Success!</div>
          <div className="balance-success">You just send $ {parseFloat(amount).toFixed(2)} to {driverEmail}</div>
          <button className="transfer-button" type="button" onClick={handleBackToFormClick}>Back to Tip Form</button>
        </div>
      }
    </div>
  )
}

export default BalanceTransfer
