const jwt = require('jsonwebtoken')

module.exports = {
  validateToken: async (req, res, next) => {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]
      const options = {
        expiresIn: '2d'
      }

      try {
        const authUser = await jwt.verify(token, process.env.APP_SECRET, options)

        req.decoded = authUser

        next()
      } catch (error) {
        throw new Error(error)
      }
    } else {
      res.status(401).send('Authentication error. Token required.')
    }
  }
}