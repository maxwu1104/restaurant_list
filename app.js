// require express framework in this project
const express = require('express')
const app = express()

// require express middleware
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require internal files
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
require('./helper')

// express template engine setting
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// go through here first
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: true
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// authenticated
usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes setting
app.use(routes)

// server start and listen
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('Express server is working on http://localhost:3000')
})
