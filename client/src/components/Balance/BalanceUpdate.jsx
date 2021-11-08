import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import CurrentBalance from "./CurrentBalance";
import BalanceAPIutils from './BalanceAPIutils';
import { AuthContext } from '../../App';

function BalanceUpdate({ handleBalanceUpdate }) {
  const [amount, setAmount] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [ successDeposit, setSuccessDeposit] = useState(false);
  const [ successWithdrawal, setSuccessWithdrawal] = useState(false);
  const [ deposited, setDeposited] = useState('');
  const [ withdrawn, setWithdrawn] = useState('');

  const userData = useContext(AuthContext);

  const handleDeposit = async () => {
    try {
      // check for blank amount and display message

      setSuccessDeposit(false);
      setSuccessWithdrawal(false);
      const { status } = await BalanceAPIutils.deposit(userData.id, amount);
  
      if (status === 201) {
        setDeposited(amount);
        setSuccessDeposit(true);
        const newBalance = userData.balance + parseFloat(amount);
        handleBalanceUpdate(newBalance)
      }
  
      setAmount('');

    } catch(err) {
      console.log(err)
    }
  }

  const handleWithdrawal = async () => {
    try {
      // check for blank amount and display message
      
      setSuccessDeposit(false);
      setSuccessWithdrawal(false);
      if (amount > userData.balance) {
        setDisplayError(true);
      } else {
        setDisplayError(false)
        const { status } = await BalanceAPIutils.withdraw(userData.id, amount);
  
        if (status === 201) {
          setWithdrawn(amount);
          setSuccessWithdrawal(true);
          const newBalance = userData.balance - parseFloat(amount);
          handleBalanceUpdate(newBalance);
        }
      }
      setAmount('');
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="balance">
      <Navbar />
      <CurrentBalance currentBalance={userData.balance.toFixed(2)}/>
      <div className="balance-form">
        <div>
          <label className="balance-instructions">Enter amount to deposit or withdraw</label>
        </div>
        <div>
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
        <button
          className="transfer-button"
          type="button"
          onClick={handleDeposit}
        >Deposit
        </button>
        <button
          className="transfer-button"
          type="button"
          onClick={handleWithdrawal}
          >Withdraw
        </button>
      </div>
      {displayError &&
        <div className="balance-message balance-error" id="balance-error">You cannot withdraw more than your current balance</div>
      }
      {successDeposit &&
        <div className="balance-message-container">
          <div className="balance-message balance-success">SUCCESS!</div>
          <div className="balance-message balance-success">$ {parseFloat(deposited).toFixed(2)} has been added to your account</div>
        </div>
      }
      {successWithdrawal &&
        <div className="balance-message-container">
          <div className="balance-message balance-success">SUCCESS!</div>
          <div className="balance-message balance-success">$ {parseFloat(withdrawn).toFixed(2)} has been withdrawn from your account</div>
        </div>
      }
    </div>
  )
}

export default BalanceUpdate;
