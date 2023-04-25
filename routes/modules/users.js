const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

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

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆須填寫' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: 'The Email is registered.' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => {
        const newUser = new User({ name, email, password: hash })
        newUser.save().then(() => {
          req.login(newUser, (err) => {
            if (err) return console.error(err)
            return res.redirect('/')
          })
        })
      })
      .catch((err) => console.error(err))
  })
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

module.exports = router
