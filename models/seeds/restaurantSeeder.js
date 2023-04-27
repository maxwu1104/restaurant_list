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
  Promise.all(
    SEED_USER.map((user, userIndex) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => User.create({ email: user.email, password: hash }))
        .then((user) => {
          const userId = user._id
          return Promise.all(
            Array.from(
              SEED_DATA.slice(0 + userIndex * 3, 3 + userIndex * 3),
              (restaurant, restaurantIndex) => {
                delete restaurant.id
                restaurant.userId = userId
                return Restaurant.create(restaurant)
              }
            )
          )
        })
        .catch((err) => console.error(err))
    })
  )
    .then(() => {
      console.log('Seeder data is created')
      process.exit()
    })
    .catch((err) => console.error(err))
})
