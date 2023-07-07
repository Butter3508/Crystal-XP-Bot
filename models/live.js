const mongoose = require('mongoose');

let Schem = new mongoose.Schema({
    guildId: String,
    channelId: String
})

module.exports = mongoose.model('livechat', Schem);