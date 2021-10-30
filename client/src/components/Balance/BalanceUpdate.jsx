import React, { useState, useEffect } from 'react';
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
    <div>
      <CurrentBalance currentBalance={currentBalance}/>
      <div>
        <label>Enter amount to deposit or withdraw</label>
        <input
          value={amount}
          type="number"
          min="0.00"
          step="0.01"
          onChange={(e) => setAmount(e.target.value)}
        />
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
        <div id="balance-error">You cannot withdraw more than your current balance</div>
      }
      {successDeposit &&
        <div>
          <div>SUCCESS!</div>
          <div id="balance-success">$ {deposited} has been added to your account</div>
        </div>
      }
      {successWithdrawal &&
        <div>
          <div>SUCCESS!</div>
          <div id="balance-success">$ {withdrawn} has been withdrawn from your account</div>
        </div>
      }
    </div>
  )
}

export default BalanceUpdate;