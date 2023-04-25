// require express framework in this project
const express = require('express')

// require express middleware
const router = express.Router()

// require internal files
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

// router setting
router.use('/users/', users)
router.use('/restaurants', restaurants)
router.use('/', home)

module.exports = router
