// require express framework in this project
const express = require('express')
const app = express()

// require express middleware
const { engine } = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// require internal files
const routes = require('./routes')

// express template engine setting
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// go through here first
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// routes setting
app.use(routes)

// mongoose setting
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => console.log('error'))
db.once('open', () => console.log('MongoDB is connected.'))

//server start and listen
app.listen(3000, () => {
  console.log(`Express server is working on http://localhost:3000`)
})
