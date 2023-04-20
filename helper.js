const Handlebars = require('handlebars')

Handlebars.registerHelper('ifEqual', function (a, b, options) {
  if (a === b) {
    return options.fn(this)
  }
  return options.inverse(this)
})

module.exports = Handlebars
