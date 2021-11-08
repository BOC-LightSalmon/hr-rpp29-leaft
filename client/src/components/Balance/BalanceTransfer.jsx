import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import CurrentBalance from './CurrentBalance.jsx';
import BalanceAPIutils from './BalanceAPIutils'

function BalanceTransfer({ handleBalanceUpdate }) {
  // const [ currentBalance, setCurrentBalance ] = useState(0);
  const [ amount, setAmount ] = useState('');
  const [ driverEmail, setDriverEmail ] = useState('');
  const [ displayBalanceError, setDisplayBalanceError ] = useState(false);
  const [ displaySelfError, setDisplaySelfError ] = useState(false);
  const [ displayNotFoundError, setDisplayNotFoundError ] = useState(false);
  const [ displaySuccessMessage, setDisplaySuccessMessage ] = useState(false);
  const [ displayTipForm, setDisplayTipForm ] = useState(true);

  const userData = useContext(AuthContext);

  // const getUserBalance = async () => {
  //     const { data } = await BalanceAPIutils.getBalance(userData.id)
  //     setCurrentBalance(data);
  // }

  const handleSend = async () => {
    try {
      setDisplaySuccessMessage(false)
      setDisplaySelfError(false);
      setDisplayNotFoundError(false);
      if (amount > userData.balance) {
        setDisplayBalanceError(true)
      } else {
        setDisplayBalanceError(false)
        await BalanceAPIutils.transfer(userData.id, driverEmail, amount)
        setDisplaySuccessMessage(true)
        setDisplayTipForm(false)
        // getUserBalance()
        handleBalanceUpdate(userData.balance - parseFloat(amount))

      }
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

  // useEffect(() => {
  //   getUserBalance();
  // }, [])



  return (
    <div className="balance">
      <Navbar />
      <CurrentBalance currentBalance={userData.balance}/>
      {displayTipForm &&
        <div>
          <div className="balance-form">
            <div>
              <label className="balance-instructions">Enter email address of driver</label>
              <input
                value={driverEmail}
                onChange={(e) => setDriverEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="balance-instructions">Enter Tip Amount</label>
              <input
                value={amount}
                type="number"
                min="0.00"
                step="0.01"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="button" className="transfer-button" onClick={handleSend}>Send Tip</button>
          </div>
        </div>
      }
      {displayBalanceError &&
        <div className="balance-error">You cannot send more than your current balance</div>
      }
      {displaySelfError &&
        <div className="balance-error">You cannot send money to yourself</div>
      }
      {displayNotFoundError &&
        <div>
          <div className="balance-error">There is no user found with this email address</div>
          <div className="balance-error">Please Try Again</div>
        </div>
      }
      {displaySuccessMessage &&
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
