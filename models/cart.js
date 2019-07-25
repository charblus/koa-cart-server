var mongoose = require('mongoose')
var schema = mongoose.Schema
const cart = new schema({
    'name': String,
    'img': String
})
const user = mongoose.model('cart', cart)
module.exports = user
