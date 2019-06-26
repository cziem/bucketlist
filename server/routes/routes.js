const express = require('express')
const router = express.Router()

/* import the app route controller logic */
const bucketListController = require('../controllers/controller.js')
const authUser = require('../middlewares/auth').validateToken

/* 
* @method: POST
* @route: api/v1/auth/signup
* @auth: Public
* @desc: Create a user
*/
router.post('/auth/signup', bucketListController.signup)

/* 
* @method: POST
* @route: api/v1/auth/login
* @auth: Public
* @desc: Login a user
*/
router.post('/auth/login', bucketListController.login)

/* 
* @method: GET
* @route: api/v1/auth/logouot
* @auth: Private
* @desc: Logout a user
*/
router.get('/auth/logout', bucketListController.logout)

/* 
* @method: POST
* @route: api/v1/auth/bucketlists
* @auth: Private
* @desc: Create a new bucketlist
*/
router.post('/auth/bucketlists', authUser, bucketListController.createBucketList)

/* 
* @method: GET
* @route: api/v1/auth/bucketlists
* @auth: Private
* @desc: Get all bucketlists
*/
router.get('/auth/bucketlists', authUser, bucketListController.getBucketLists)

/* 
* @method: GET
* @route: api/v1/auth/bucketlists/{id}
* @auth: Private
* @desc: Get a single bucketlist
*/
router.get('/auth/bucketlists/:id', authUser, bucketListController.getBucketList)

/* 
* @method: PUT
* @route: api/v1/auth/bucketlists/{id}
* @auth: Private
* @desc: Update a single bucketlist
*/
router.put('/auth/bucketlists/:id', authUser, bucketListController.updateBucketList)

/* 
* @method: DELETE
* @route: api/v1/auth/bucketlists/{id}
* @auth: Private
* @desc: Delete a single bucketlist
*/
router.delete('/auth/bucketlists/:id', authUser, bucketListController.deleteBucketList)

/* 
* @method: POST
* @route: api/v1/auth/bucketlists/{id}/items
* @auth: Private
* @desc: Create a new item in a bucketlist
*/
router.post('/auth/bucketlists/:id/items', authUser, bucketListController.createItem)

/* 
* @method: GET
* @route: api/v1/auth/bucketlists/{id}/items
* @auth: Private
* @desc: Get all items in a bucketlists
*/
router.get('/auth/bucketlists/:id/items', authUser, bucketListController.getItems)

/* 
* @method: GET
* @route: api/v1/auth/bucketlists/{id}/items/{id}
* @auth: Private
* @desc: Get a single item in a bucketlist
*/
router.get('/auth/bucketlists/:id/items/:item_id', authUser, bucketListController.getItem)

/* 
* @method: PUT
* @route: api/v1/auth/bucketlists/{id}/items/{id}
* @auth: Private
* @desc: Update a single item in a bucketlist
*/
router.put('/auth/bucketlists/:id/items/:item_id', authUser, bucketListController.updateItem)

/* 
* @method: DELETE
* @route: api/v1/auth/bucketlists/{id}/itesm/{id}
* @auth: Private
* @desc: Delete a single item in a bucketlist
*/
router.delete('/auth/bucketlists/:id/items/:item_id', authUser, bucketListController.deleteItem)

module.exports = router