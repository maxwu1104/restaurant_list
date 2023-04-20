const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:id(\\w{24})', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((_error) => console.log('error'))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  const restaurant = req.body
  const newRestaurant = new Restaurant({ ...restaurant })
  return newRestaurant
    .save()
    .then(() => res.redirect('/'))
    .catch((_error) => console.log('error'))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant, id }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurantEdit = req.body
  return Restaurant.findByIdAndUpdate(id, restaurantEdit)
    .then(() => res.redirect('/'))
    .catch((_error) => console.log('error'))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/')
    })
    .catch((_error) => console.log('error'))
})

router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((_error) => console.log('error'))
})

module.exports = router
