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