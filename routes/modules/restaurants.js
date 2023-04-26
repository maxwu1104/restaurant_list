const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:id(\\w{24})', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((_error) => console.log('error'))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  const restaurant = req.body
  const userId = req.user._id
  const newRestaurant = new Restaurant({ ...restaurant, userId })
  return newRestaurant
    .save()
    .then(() => res.redirect('/'))
    .catch((_error) => console.log('error'))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant, id: _id }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const restaurantEdit = req.body
  return Restaurant.findOneAndUpdate({ _id, userId }, restaurantEdit)
    .then(() => res.redirect('/'))
    .catch((_error) => console.log('error'))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOneAndDelete({ _id, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch((_error) => console.log('error'))
})

router.get('/:id/detail', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((_error) => console.log('error'))
})

module.exports = router
