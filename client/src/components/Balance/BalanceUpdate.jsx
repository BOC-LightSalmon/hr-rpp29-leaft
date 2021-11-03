import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import CurrentBalance from "./CurrentBalance";
import BalanceAPIutils from './BalanceAPIutils';
import './balance.scss'

function BalanceUpdate({ userId }) {
  const [currentBalance, setCurrentBalance] = useState(0.00);
  const [amount, setAmount] = useState('');

  const [ displayToggles, setDisplayToggles ] = useState({
    displayError: false,
    successDeposit: false,
    successWithdrawal: false
  })

  const [ transfered, setTransfered ] = useState({
    deposited: '',
    withdrawn: ''
  })

  const getUserBalance = async () => {
      const { data } = await BalanceAPIutils.getBalance(userId)
      setCurrentBalance(data.toFixed(2));
  }

  useEffect(() => {
    getUserBalance();
  }, [])

  const handleDeposit = async () => {
    setDisplayToggles({
      ...displayToggles,
      successDeposit: false,
      successWithdrawal: false
    })
    const { status } = await BalanceAPIutils.deposit(userId, amount);

    if (status === 201) {
      setTransfered({...transfered, deposited: amount });
    setDisplayToggles({...displayToggles, successDeposit: true})
    }

    getUserBalance();
    setAmount('');
  }

  const handleWithdrawal = async () => {
    setDisplayToggles({
      ...displayToggles,
      successDeposit: false,
      successWithdrawal: false
    })
    if (parseInt(amount) > currentBalance) {
      setDisplayToggles({...displayToggles, displayError: true})
    } else {
      setDisplayToggles({...displayToggles, displayError: false})
      const { status } = await BalanceAPIutils.withdraw(userId, amount);

      if (status === 201) {
        setTransfered({...transfered, withdrawn: amount })
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
      {displayToggles.displayError &&
        <div className="balance-message balance-error" id="balance-error">You cannot withdraw more than your current balance</div>
      }
      {displayToggles.successDeposit &&
        <div className="balance-message-container">
          <div className="balance-message balance-success">SUCCESS!</div>
          <div className="balance-message balance-success">$ {parseInt(transfered.deposited).toFixed(2)} has been added to your account</div>
        </div>
      }
      {displayToggles.successWithdrawal &&
        <div className="balance-message-container">
          <div className="balance-message balance-success">SUCCESS!</div>
          <div className="balance-message balance-success">$ {transfered.withdrawn} has been withdrawn from your account</div>
        </div>
      }
    </div>
  )
}

export default BalanceUpdate;
