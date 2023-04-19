const mongoose = require('mongoose')

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

module.exports = db