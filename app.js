//require package in this project
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const restaurantData = require('./restaurant.json')

//express template engine setting
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

//port setting
const port = 3000

//router setting
app.get('/', (req, res) => {
  const restaurantList = restaurantData.results
  res.render('index', { restaurant: restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurantData.results.find(
    (restaurant) => restaurant.id.toString() === id
  )
  return res.render('show', { restaurant: restaurant })
})

//server start and listen
app.listen(port, () => {
  console.log(`Express server is working on http://localhost:${port}`)
})
