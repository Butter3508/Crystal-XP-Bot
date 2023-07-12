const livechat = require('../../models/live')

module.exports = {
    name: 'messageCreate',
    discord: true,
    async run(bot, msg) {
        // Transfer protocol - Input
        let data = await livechat.findOne({ guildId: msg.guildId });
        if (!data) return
        if (msg.channelId !== data.channelId) return
        if (msg.author.bot) return
        msg.react('✅');
        let tag = msg.author.tag
        bot.chat(`> [${tag.substring(0, tag.indexOf('#0'))}] ${msg} | [${Math.random().toFixed(4)}]`)
    }
}