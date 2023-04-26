const Restaurant = require('../restaurant')
const User = require('../user')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const SEED_USER = [
  { email: 'user1@example.com', password: '1234' },
  { email: 'user2@example.com', password: '1234' }
]
const SEED_DATA = require('./restaurant.json').results

db.once('open', () => {
  const promises = []
  for (let i = 0; i < 2; i++) {
    const p = bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(SEED_USER[i].password, salt))
      .then((hash) =>
        User.create({ email: SEED_USER[i].email, password: hash })
      )
      .then((user) => {
        const userId = user._id
        return Promise.all(
          Array.from(SEED_DATA.slice(0 + i * 3, 3 + i * 3), (value, index) => {
            delete value.id
            value.userId = userId
            return Restaurant.create(value)
          })
        )
      })
      .catch((err) => console.error(err))
    promises.push(p)
  }
  Promise.all(promises)
    .then(() => {
      console.log('Seeder data is created')
      process.exit()
    })
    .catch((err) => console.error(err))
})
