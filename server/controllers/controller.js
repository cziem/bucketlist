const mongoose = require('mongoose')
const User = require('../models/user')

module.exports = {
  login: async (req, res) => {
    req.json({
      message: 'Request to login user',
      status: 'success'
    })
  }
}