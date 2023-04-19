const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurant: restaurants }))
    .catch((error) => console.log('error'))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find()
    .lean()
    .then((restaurants) => {
      const restaurant = restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
        )
      })
      res.render('index', { restaurant: restaurant, keyword: keyword })
    })
    .catch((error) => console.log('error'))
})

module.exports = router
