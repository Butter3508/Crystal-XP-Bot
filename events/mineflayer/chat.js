module.exports = {
    name: 'chat',
    discord: false,
    async run(bot, usr, msg) {
        if (!msg.startsWith(bot.prefix)) return
        const args = msg.slice(bot.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = bot.cmds.find(c => c.name === cmd);
        if (command) {
            if (command.admin && usr !== 'Butter7838') return;
            command.run(bot, usr, msg, args)
        }
    }
}