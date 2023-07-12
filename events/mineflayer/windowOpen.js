const mineflayer = require('mineflayer')
const { Window } = require('prismarine-windows')
const embedSend = require('../../utils/embedSend')

module.exports = {
    name: 'windowOpen',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {Window} window 
     */
    async run(bot, window) {
        window.requiresConfirmation = false;
        let slots = Number(window.slots.length)
        if (slots == 62 || slots == 63) {
            // GUI Rương ==> Chuyển server
            bot.simpleClick.leftMouse(13)
            embedSend(
                bot.client,
                `Đã chuyển Server thành công`,
                'GREEN'
            )
        }
        if (slots == 45 || slots == 46) {
            // GUI Crafting table ==> Đăng nhập
            const pin = bot.pin.split(' ').map(Number)
            
            bot.clickWindow(pin[0], 0, 0)
            bot.clickWindow(pin[1], 0, 0)
            bot.clickWindow(pin[2], 0, 0)
            bot.clickWindow(pin[3], 0, 0)


            embedSend(
                bot.client,
                `Đã đăng nhập thành công`,
                'GREEN'
            )
        }
    }
}