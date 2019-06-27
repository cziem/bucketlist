const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const BucketList = require('../models/bucketList')
const escapeRegex = require('../middlewares/escapeRegex')

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

      const bucketList = await BucketList.create(bucket)

      res.status(201).json(bucketList)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Get a list of all buckets */
  getBucketLists: async (req, res) => {
    const pageNo = parseInt(req.query.page) || 1
    const size = parseInt(req.query.limit) || 20
    const query = {}
    const search = req.query.q || ''

    query.skip = size * (pageNo - 1)
    query.limit = size

    if (size > 100) return res.status(400).send('Query limit exceeded. Allowed maximum is 100')

    if (search) {
      const searchTerm = new RegExp(escapeRegex(search), "gi")

      try {
        const totalCount = await BucketList.countDocuments({})
        const buckets = await BucketList.find({ name: searchTerm }, {}, query)
        const totalPages = Math.ceil(totalCount / size)

        if (buckets.length < 1) return res.json({ data: 'No results found' })

        return res.json({
          buckets,
          pages: totalPages
        })
      } catch (error) {
        return res.status(400).send(error.message)
      }
    } else {
      try {
        const totalCount = await BucketList.countDocuments({})
        const buckets = await BucketList.find({}, {}, query)
        const totalPages = Math.ceil(totalCount / size)

        return res.json({
          buckets,
          pages: totalPages
        })
      } catch (error) {
        return res.status(400).send(error.message)
      }
    }
  },

  /* Get a single bucketlist */
  getBucketList: async (req, res) => {
    const { id } = req.params

    try {
      const bucketList = await BucketList.findById(id)

      if (bucketList) {
        return res.json(bucketList)
      } else {
        return res.status(404).send('Bucketlist does not exist')
      }

    } catch (error) {
      return res.status(404).send(error.message)
    }
  },

  /* Update a bucketlist */
  updateBucketList: async (req, res) => {
    const { id } = req.params

    try {
      const bucketList = await BucketList.findByIdAndUpdate(id, {
        $set: {
          name: req.body.name,
          updatedAt: Date.now()
        }
      }, { new: true })

      return res.status(200).json(bucketList)
    } catch (error) {
      return res.status(404).send(error.message)
    }
  },

  /* Delete a bucketlist */
  deleteBucketList: async (req, res) => {
    const { id } = req.params

    try {
      await BucketList.findByIdAndDelete(id)

      return res.status(200).send('Item deleted')
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Create a new item in bucketlist */
  createItem: async (req, res) => {
    const { id } = req.params

    try {
      const bucketList = await BucketList.findById(id)

      const existingItem = bucketList.todoList.find(item => item.name === req.body.name)

      if (existingItem) return res.status(400).send('Item with name already exists')

      const todoItem = {
        name: req.body.name,
        completed: req.body.completed
      }

      bucketList.todoList.push(todoItem)

      const result = await bucketList.save(bucketList)

      return res.status(201).json(result)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Get all items in a bucketlist */
  getItems: async (req, res) => {
    const { id } = req.params

    try {
      const bucketList = await BucketList.findById(id)

      if (!bucketList) return res.status(404).send('Bucketlist does not exist.')

      return res.json(bucketList.todoList)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Get a single item in a bucketlist */
  getItem: async (req, res) => {
    const { id, item_id } = req.params

    try {
      const bucketList = await BucketList.findById(id)

      if (!bucketList) return res.status(404).send('Bucketlist does not exist.')

      const todoItem = bucketList.todoList.find(item => item._id.toString() === item_id)

      if (!todoItem) return res.status(401).send('Item does not exist')

      return res.json(todoItem)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Update a bucketlist item */
  updateItem: async (req, res) => {
    const { id, item_id } = req.params

    try {
      const bucketList = await BucketList.findById(id)

      if (!bucketList) return res.status(404).send('Bucketlist does not exist.')

      const todoItem = bucketList.todoList.find(item => item._id.toString() === item_id)

      if (!todoItem) return res.status(401).send('Item does not exist')

      todoItem.set({ name: req.body.name, completed: req.body.completed })

      await bucketList.save(todoItem)

      return res.json(todoItem)
    } catch (error) {
      return res.status(400).send(error.message)
    }
  },

  /* Delete an item in a bucketlist */
  deleteItem: async (req, res) => {
    const { id, item_id } = req.params

    try {
      const bucketList = await BucketList.findByIdAndUpdate(id, {
        '$pull': { todoList: { '_id': item_id } }
      }, { new: true })

      if (!bucketList) return res.status(404).send('Bucketlist does not exist.')

      return res.status(200).send('Item deleted')
    } catch (error) {
      return res.status(400).send(error.message)
    }
  }
}
