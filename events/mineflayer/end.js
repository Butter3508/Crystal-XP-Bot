const embedSend = require('../../utils/embedSend')

module.exports = {
    name: 'end',
    async run(bot, reason) {
        embedSend(
            bot.client,
            `Bot đã mất kết nối do \`${reason}\`\nĐang cố gắng kết nối lại sau 15s`,
            'RED'
        );

        setTimeout(() => require('../../bot')(bot.client), 15 * 1000)
    }
}