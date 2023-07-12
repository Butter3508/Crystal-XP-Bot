const fs = require('fs')

module.exports = (bot) => {
    let count = 0;
    fs.readdirSync('./events/mineflayer').filter(file => file.endsWith('.js'))
    .forEach(file => {
        const event = require(`../events/mineflayer/${file}`);
        if (event.name) {
            count++
            if (event.discord)
                bot.client.on(event.name, (...args) => { event.run(bot, ...args) })
            else
                bot.on(event.name, (...args) => { event.run(bot, ...args) });
        }
    })

    console.log(`[INFO] Đã chạy thành công ${count} mineflayer presets`)
}