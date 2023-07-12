const fs = require('fs')

module.exports = (client) => {
    let count = 0;
    fs.readdirSync('./events/discord').filter(file => file.endsWith('.js'))
    .forEach(file => {
        const event = require(`../events/discord/${file}`);
        if (event.name) {
            count++
            client.on(event.name, (...args) => { event.run(client, ...args) })
        }
    })

    console.log(`[INFO] Đã chạy thành công ${count} DJS presets`)
}