const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listItems = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  completed: { type: Boolean, default: false }
})

const ListItems = mongoose.model('ListItems', listItems)

module.exports = ListItems