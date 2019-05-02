const {User} = require('../models')
const {SocialService} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Este email ya esta siendo usado.',
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'Verifique sus credenciales.'
        })
      }
      isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Verifique sus credenciales.'
        })
      }
      const userJson = user.toJSON()
      res.send({
      user: userJson
    })
    } catch (err) {
      res.status(500).send({
        error: 'This shit is broken. Try again later.'
      })
    }
  },
  async newSocialService (req, res) {
    try {
      const socialService = await SocialService.create(req.body)
      res.send(socialService.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Verifique los datos.'
      })
    }
  }
}