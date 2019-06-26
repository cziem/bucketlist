const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const BucketList = require('../models/bucketList')

module.exports = {
  /* Signup user */
  signup: async (req, res) => {

    try {
      let existingUser = await User.findOne({ username: req.body.username })
      if (existingUser) {
        return res.status(409).send('username already in use')
      }

      const { username, email, password, name } = req.body

      const hashed = await bcrypt.hash(password, process.env.SALT_ROUNDS)


      const payload = { user: user.name, id: user._id }
      const options = { expiresIn: '2d' }
      const secret = process.env.APP_SECRET
      const token = jwt.sign(payload, secret, options)

      const user = await User.create({
        username,
        email,
        password: hashed,
        name
      })

      const details = {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token
      }

      return res.status(201).json(details)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Login user */
  login: async (req, res) => {
    try {
      const { username, password } = req.body

      const user = await User.findOne({ username }).select('-__v')

      if (!user) return res.status(400).send('User not found.')

      const hashed = await bcrypt.compare(password, user.password)

      if (hashed) {
        const payload = { user: user.name, id: user._id }
        const options = { expiresIn: '2d' }
        const secret = process.env.APP_SECRET
        const token = jwt.sign(payload, secret, options)

        const details = {
          token,
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }

        return res.json(details)
      } else {
        return res.status(400).send('invalid password.')
      }
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Logout user */
  logout: async (req, res) => {
    await res.json({
      message: 'Request to logout user',
      status: 'success'
    })
  },

  /* Create bucketlist */
  createBucketList: async (req, res) => {
    const { name } = req.body

    try {
      let existingBucket = await BucketList.findOne({ name })

      if (existingBucket) return res.status(400).send('BucketList with name already exists')

      const bucket = new BucketList({
        name,
        createdBy: req.decoded.id
      })

      bucket.todoList.push(req.body.todo_list)

      const bucketList = await BucketList.create(bucket)

      res.status(201).json(bucketList)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Get a list of all buckets */
  getBucketLists: async (req, res) => {
    const buckets = await BucketList.find({})
    res.json(buckets)
  },

  /* Get a single bucketlist */
  getBucketList: async (req, res) => {
    await res.json({
      message: 'Request to get a single bucketlist',
      status: 'success'
    })
  },

  /* Update a bucketlist */
  updateBucketList: async (req, res) => {
    await res.json({
      message: 'Request to update a bucketlist',
      status: 'success'
    })
  },

  /* Delete a bucketlist */
  deleteBucketList: async (req, res) => {
    await res.json({
      message: 'Request to delete a bucketlist',
      status: 'success'
    })
  },

  /* Create a new item in bucketlist */
  createItem: async (req, res) => {
    await res.json({
      message: 'Request to create a new item in bucketlist',
      status: 'success'
    })
  },

  /* Get all items in a bucketlist */
  getItems: async (req, res) => {
    await res.json({
      message: 'Request to get all items in a bucketlist',
      status: 'success'
    })
  },

  /* Get a single item in a bucketlist */
  getItem: async (req, res) => {
    await res.json({
      message: 'Request to get a single item in a bucketlist',
      status: 'success'
    })
  },

  /* Update a bucketlist item */
  updateItem: async (req, res) => {
    await res.json({
      message: 'Request to update an item in a bucketlist',
      status: 'success'
    })
  },

  /* Delete an item in a bucketlist */
  deleteItem: async (req, res) => {
    await res.json({
      message: 'Request to delete a single item in a bucketlist',
      status: 'success'
    })
  }
}