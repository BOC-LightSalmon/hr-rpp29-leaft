import React, { useState, useEffect } from 'react';
import CurrentBalance from "./CurrentBalance";
import BalanceAPIutils from './BalanceAPIutils';

function BalanceUpdate({ userId }) {
  const [currentBalance, setCurrentBalance] = useState(0);
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
      setCurrentBalance(data);
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
    if (amount > currentBalance) {
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
      {displayToggles.displayError &&
        <div id="balance-error">You cannot withdraw more than your current balance</div>
      }
      {displayToggles.successDeposit &&
        <div>
          <div>SUCCESS!</div>
          <div id="balance-success">$ {transfered.deposited} has been added to your account</div>
        </div>
      }
      {displayToggles.successWithdrawal &&
        <div>
          <div>SUCCESS!</div>
          <div id="balance-success">$ {transfered.withdrawn} has been withdrawn from your account</div>
        </div>
      }
    </div>
  )
}

export default BalanceUpdate;
