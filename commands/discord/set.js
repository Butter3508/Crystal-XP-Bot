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
        if (!args[0]) return msg.reply('Bạn phải nhập ID channel cần set')
        // c.set <channel ID>
        const { guildId, channelId } = msg;
        let profile = await livechat.findOne({ guildId: guildId, channelId: channelId });
        if (!profile) {
            let newProfile = new livechat({ guildId: guildId, channelId: args[0] });
            msg.reply(`Đã tạo thành công dữ liệu mới!`)
            await newProfile.save().catch((e) => msg.reply(`Không thể tạo dữ liệu mới do: ${e}`));
        } else {
            profile.channelId = args[0];
            msg.reply(`Đã thay đổi ID livechat thành \`${profile.channelId}}\``)
        }
    }
}