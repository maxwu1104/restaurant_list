//require package in this project
const express = require('express')
const app = express()

//port setting
const port = 3000

//router setting
app.get('/', (req, res) => {
  res.send('Initial project start.')
})

//server start and listen
app.listen(port, () => {
  console.log(`Express server is working on http://localhost:${port}`)
})
