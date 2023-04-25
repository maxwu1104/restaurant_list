const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.get('/register', (req, res) => {
  return res.render('register')
})

module.exports = router
