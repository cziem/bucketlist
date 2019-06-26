const mongoose = require('mongoose')
const User = require('../models/user')

module.exports = {
  /* Login user */
  login: async (req, res) => {
    await res.json({
      message: 'Request to login user',
      status: 'success'
    })
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
    await res.json({
      message: 'Request to create new bucketlist',
      status: 'success'
    })
  },

  /* Get a list of all buckets */
  getBucketLists: async (req, res) => {
    await res.json({
      message: 'Request to get a list of all buckets',
      status: 'success'
    })
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