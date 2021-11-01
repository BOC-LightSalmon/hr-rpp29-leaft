import axios from 'axios';

const BalanceAPIutils = {
  getBalance: async (userId) => {
    return await axios.get(`/api/balance/get-balance/${userId}`)
  },

  deposit: async (userId, amount) => {
    return await axios.put(`/api/balance/deposit/${userId}`, { amount })
  },

  withdraw: async (userId, amount) => {
    return await axios.put(`/api/balance/withdraw/${userId}`, { amount })
  },

  transfer: async (userIdSending, userEmailReceiving, amount) => {
    return await axios.put(`/api/balance/transfer`, {
      userIdSending,
      userEmailReceiving,
      amount
    })
  }
}

export default BalanceAPIutils;