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
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantData.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  res.render('index', { restaurant: restaurants, keyword: keyword })
})

//server start and listen
app.listen(port, () => {
  console.log(`Express server is working on http://localhost:${port}`)
})
