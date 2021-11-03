import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import CurrentBalance from "./CurrentBalance";
import BalanceAPIutils from './BalanceAPIutils';

function BalanceUpdate({ userId }) {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [ successDeposit, setSuccessDeposit] = useState(false);
  const [ successWithdrawal, setSuccessWithdrawal] = useState(false);
  const [ deposited, setDeposited] = useState('');
  const [ withdrawn, setWithdrawn] = useState('');

  const getUserBalance = async () => {
      const { data } = await BalanceAPIutils.getBalance(userId)
      setCurrentBalance(data);
  }

  useEffect(() => {
    getUserBalance();
  }, [])

  const handleDeposit = async () => {
    setSuccessDeposit(false);
    setSuccessWithdrawal(false);
    const { status } = await BalanceAPIutils.deposit(userId, amount);

    if (status === 201) {
      setDeposited(amount);
      setSuccessDeposit(true);
    }

    getUserBalance();
    setAmount('');
  }

  const handleWithdrawal = async () => {
    setSuccessDeposit(false);
    setSuccessWithdrawal(false);
    if (amount > currentBalance) {
      setDisplayError(true);
    } else {
      setDisplayError(false)
      const { status } = await BalanceAPIutils.withdraw(userId, amount);

      if (status === 201) {
        setWithdrawn(amount)
        setSuccessWithdrawal(true)
      }
    }
    getUserBalance();
    setAmount('');
  }

  return (
    <div className="balance">
      <Navbar userId={userId} />
      <CurrentBalance currentBalance={currentBalance}/>
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
          <div className="balance-message balance-success">$ {parseInt(deposited).toFixed(2)} has been added to your account</div>
        </div>
      }
      {successWithdrawal &&
        <div className="balance-message-container">
          <div className="balance-message balance-success">SUCCESS!</div>
          <div className="balance-message balance-success">$ {withdrawn} has been withdrawn from your account</div>
        </div>
      }
    </div>
  )
}

export default BalanceUpdate;
