//require package in this project
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')

//express templete engine setting
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

//port setting
const port = 3000

//router setting
app.get('/', (req, res) => {
  res.render('index')
})

//server start and listen
app.listen(port, () => {
  console.log(`Express server is working on http://localhost:${port}`)
})
