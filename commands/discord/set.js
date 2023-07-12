const { Client, Message } = require('discord.js')
const livechat = require('../../models/live')

module.exports = {
    name: 'set',
    discord: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     * @param {String[]} args 
     */
    run: async(client, msg, args) => {
        if (!args[0]) return msg.reply('Bạn phải nhập ID channel cần set');
        // c.set <channel ID>
        const { guildId } = msg;

        let guild = client.guilds.cache.get(guildId);
        let member = guild.members.cache.get(msg.author.id);

        if (!member.permissions.has('ADMINISTRATOR'))
            return message.reply(`Bạn cần quyền \`ADMINISTRATOR\` để có thể dùng lệnh`)

        let profile = await livechat.findOne({ guildId: guildId });
        if (!profile) {
            let newProfile = new livechat({ guildId: guildId, channelId: args[0] });
            msg.reply(`Đã tạo thành công dữ liệu mới!`)
            await newProfile.save().catch((e) => {});
        } else {
            profile.channelId = args[0]
            await profile.save().catch((e) => {})
            msg.reply(`Đã thay đổi ID livechat thành \`${profile.channelId}\``)
        }
    }
}