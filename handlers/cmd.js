const fs = require('fs')

module.exports = (bot) => {
    let count = 0;
    fs.readdirSync('./commands').forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}`)
            .filter(file => file.endsWith('.js'));
        for (const file of files) {
            const cmd = require(`../commands/${dir}/${file}`);
            if (cmd.name) {
                bot.cmds.push(cmd);
                count++
            } else { continue }
        }
    })

    console.log(`[Library-Info] Loaded ${count} commands, enjoy!`)
}