const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.redirect('https://app.swaggerhub.com/apis-docs/phavor/Bucketlist/v1'))

module.exports = router