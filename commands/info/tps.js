module.exports = {
    name: 'tps',
    category: 'info',
    run: async(bot, usr, msg, args) => {
        bot.chat(`/w ${usr} TPS hiện tại là khoảng ${bot.getTps()}`)
    }
}