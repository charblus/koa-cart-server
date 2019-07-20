var mongoose = require('mongoose')
var schema = mongoose.Schema
const userinfo = new schema({
    'username': String,
    'password': String
})
const user = mongoose.model('userinfo', userinfo)
module.exports = user
