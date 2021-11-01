require('dotenv').config();
const axios = require('axios');
const User = require('../../db/models/users');

const getBalance = async (req, res) => {
  const { userId: id } = req.params
  const { balance } = await User.findOne({
    where: {
      id: req.params.userId
    },
    logging: false
  })
  res.send(balance.toString())
}

const deposit = async (req, res) => {
  try {
    const { userId: id} = req.params;
    const { amount } = req.body;
    await User.increment('balance', {
      by: parseFloat(amount),
      where: { id }
    })
    res.sendStatus(201)
  } catch (err) {
    res.send(error)
  }
}

const withdraw = async (req, res) => {
  try {
    const { userId: id} = req.params;
    const { amount } = req.body;
    await User.decrement('balance', {
      by: parseFloat(amount),
      where: { id }
    })
    res.sendStatus(201)
  } catch (err) {
    res.send(error)
  }
}

const transfer = async (req, res) => {
  try {
    const { userIdSending, userEmailReceiving, amount } = req.body;

    const driver = await User.findOne({
      where: { email: userEmailReceiving }
    })

    if (driver) {
      if (driver.id === userIdSending) {
        res.sendStatus(405)
      } else {
        await User.increment('balance', {
          by: parseFloat(amount),
          where: { email: userEmailReceiving }
        })

        await User.decrement('balance', {
          by: parseFloat(amount),
          where: { id: userIdSending }
        })
        res.sendStatus(201)
      }

    } else {
      res.sendStatus(404)
    }

  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  getBalance,
  deposit,
  withdraw,
  transfer
};