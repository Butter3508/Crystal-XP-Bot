const mineflayer = require('mineflayer')

module.exports = {
    name: 'ping',
    category: 'info',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} usr 
     * @param {String} msg 
     * @param {String} args 
     */
    run: async(bot, usr, msg, args) => {
        if (!args[0]){
            const delay = bot.players[usr].ping;
            bot.chat(`/w ${usr} Ping: ~${delay}ms`);
        } else if (args[0]){
            const delay = bot.players[args[0]].ping;
            bot.chat(`/w ${usr} Ping của ${args[0]}: ~${delay}ms`)
        }
    }
}