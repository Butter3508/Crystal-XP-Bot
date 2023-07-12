module.exports = {
    name: 'messageCreate',
    async run(client, msg)  {
        const prefix = 'c.'
        if (!msg.content.startsWith(prefix)) return
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
        if (command) command.run(client, msg, args);
    }
}