const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log(req.headers)
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const decode = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decode
    next()
  } catch (error) {
    res.status(401).json({
      error: 'Autorización fallida!!'
    })
  }
}