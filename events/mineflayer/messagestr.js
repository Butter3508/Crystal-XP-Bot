const embedSend = require('../../utils/embedSend')

module.exports = {
    name: 'messagestr',
    discord: false,
    async run(bot, msg) {
        console.log(`[Đọc suy nghĩ] ${msg}`)
        embedSend(bot.client, msg);

        if (msg.trim().toLowerCase() == 'dùng lệnh/anarchyvn để vào server anarchy.') {
            bot.chat('/anarchyvn')
            embedSend(
                bot.client,
                `Đã nhập \`/anarchyvn\``,
                'GREEN'
            )
        }
    }
}