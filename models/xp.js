const mongoose = require('mongoose');

let Schem = new mongoose.Schema({
    username : { type: String, required: true },
    level : { type: Number, default: 0 },
    xp : { type: Number, default: 0 }
})

module.exports = mongoose.model('xp', Schem);