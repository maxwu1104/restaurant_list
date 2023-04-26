const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => res.render('index', { restaurant: restaurants }))
    .catch((_error) => console.log('error'))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      const restaurant = restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase())
        )
      })
      res.render('index', { restaurant, keyword })
    })
    .catch((_error) => console.log('error'))
})

router.get('/sort', (req, res) => {
  const sort = req.query.sort
  const sortTarget =
    sort === 'name-asc'
      ? { name: 'asc' }
      : sort === 'name-desc'
        ? { name: 'desc' }
        : sort === 'category'
          ? { category: 'asc' }
          : sort === 'location'
            ? { location: 'asc' }
            : ''
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort(sortTarget)
    .then((restaurants) => {
      return res.render('index', { restaurant: restaurants, sort })
    })
    .catch((_error) => console.log('error'))
})

module.exports = router
