const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    set(val) {
      return require('bcrypt').hashSync(val, 12) 
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)