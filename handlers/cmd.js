const fs = require('fs')

module.exports = (client, bot) => {
    let count = 0;
    fs.readdirSync('./commands').forEach(dir => {
        const files = fs.readdirSync(`./commands/${dir}`)
            .filter(file => file.endsWith('.js'));
        for (const file of files) {
            const cmd = require(`../commands/${dir}/${file}`);
            if (cmd.name) {
                if (cmd.discord) {
                    client.commands.set(cmd.name, cmd);
                    if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
                } else if (bot) {
                    bot.cmds.push(cmd)
                }
                count++
            } else { continue }
        }
    })

    console.log(`[INFO] Đã chạy ${count} lệnh!`)
}