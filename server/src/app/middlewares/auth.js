const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token is not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, 'app-secret')

    req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
