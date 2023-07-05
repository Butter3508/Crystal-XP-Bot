const mongoose = require('mongoose');

/**
 * 
 * @param {String} uri 
 */
const database = (uri) => {
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => {
        console.log(`[Library-Info] Connected to database!`);
    })
}

module.exports = database;