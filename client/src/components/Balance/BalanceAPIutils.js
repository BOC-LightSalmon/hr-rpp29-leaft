import axios from 'axios';

const BalanceAPIutils = {
  getBalance: (userId) => {
    return axios.get(`/api/balance/get-balance/${userId}`)
  },

  deposit: async (userId, amount) => {
    return axios.put(`/api/balance/deposit/${userId}`, { amount })
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