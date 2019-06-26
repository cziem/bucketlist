const express = require('express')
const router = express.Router()

/* import the app route controller logic */
const bucketListController = require('../controllers/controller.js')

/* 
* @method: POST
* @route: api/v1/auth/login
* @auth: Public
*/
router.post('/auth/login', bucketListController.login)

/* 
* @method: GET
* @route: api/v1/login
* @auth: Public
*/

/* 
* @method: GET
* @route: api/v1/login
* @auth: Public
*/

/* 
* @method: GET
* @route: api/v1/login
* @auth: Public
*/

/* 
* @method: GET
* @route: api/v1/login
* @auth: Public
*/

module.exports = router