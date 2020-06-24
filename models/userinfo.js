var mongoose = require('mongoose')
var schema = mongoose.Schema
const userinfo = new schema({
    // type: { type: String, default: 'User' },
    // name: { type: String },
    // email: { type: String },
    username: {type: String},
    password: {type: String},
    // token: { type: String, unique: true}
})
const user = mongoose.model('userinfo', userinfo)
module.exports = user
