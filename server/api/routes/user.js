const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/signup', (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          error: 'El correo ya esta siendo usado!'
        })
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          })
        } else {
          const user = new User({
            _id : new mongoose.Types.ObjectId(),
            name : req.body.name,
            lastName : req.body.lastName,
            email : req.body.email,
            password : hash
          })
          user.save()
            .then(result => {
              console.log(result)
              return res.status(201).json({
                message: 'Usuario creado!!',
                user: {
                  _id: result._id,
                  name: result.name,
                  lastName: result.lastName,
                  email: result.email
                }
              })
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({
                error: err
              })
            })
        }
      })
    })
})

router.post('/login', (req, res, next) => {
  console.log(req.body)
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          error: 'Autenticación fallida!!'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            error: 'Autenticación fallida!!'
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              userId: user[0]._id,
              name: user[0].name,
              lastName: user[0].lastName,
              email: user[0].email
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          )
          return res.status(200).json({
            message: 'Autenticación éxitosa!!',
            user: {
              _id: user[0]._id,
              name: user[0].name,
              lastName: user[0].lastName,
              email: user[0].email,
              token  : 'Bearer ' + token
            }
          })
        }
        res.status(401).json({
          error: 'Autenticación fallida!!'
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.delete('/:userId', (req, res, next) => {
  User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Usuario borrado!!'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

// TODO: This is for testing. Don't forget to delete it later.
// Fetchs all the users form the database.
router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router