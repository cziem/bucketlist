const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* import sub models for User and List items */
const ListItems = require('./listItems')

const bucketListSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  todoList: [ListItems],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const BucketList = mongoose.model('BucketList', bucketListSchema)

module.exports = BucketList