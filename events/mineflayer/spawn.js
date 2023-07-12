const fs = require('fs')
const ms = require('ms')

module.exports = {
    name: 'spawn',
    discord: false,
    async run(bot) {
        setInterval(() => {
            let content = fs.readFileSync('docs.txt', 'utf-8');
            let texts = content.split('\n');
            let sending = texts[Math.floor(Math.random() * texts.length)];
            bot.chat(sending);
        }, ms('1m'))
    }
}