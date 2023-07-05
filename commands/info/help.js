module.exports = {
    name: 'help',
    run: async(bot, usr, msg, args) => {
        bot.whisper(
            usr,
            `Hiện tại có các lệnh: ping, tps, rank`
        )
    }
}