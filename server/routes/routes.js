const express = require('express')

/* import the app route controller logic */
const bucketListController = require('../controllers/controller.js')

const router = express.Router()

/* 
* @method: GET
* @route: api/v1/login
* @auth: Public
*/
router.get('/login', bucketListController.login)

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