const XP = require('../../models/xp')

module.exports = {
    name: 'rank',
    category: 'rank',
    run: async(bot, usr, msg, args) => {
        const user = await XP.findOne({ username: usr })
            if (!user) {
                const newUser = new XP({
                    username: usr,
                    xp: 0,
                    level: 0
                });
                await newUser.save()
                    .then(() => bot.chat(`/w ${usr} Hiện tại bạn đang ở Lv.${newUser.level}, với ${newUser.xp} XP`))
                    .catch(e => bot.chat(`/w ${usr} Oops! Hiện tại đang có chút lỗi!`));
            } else {
                bot.chat(`/w ${usr} Hiện tại bạn đang ở Lv.${user.level}, với ${user.xp} XP`)
            }
    }
}