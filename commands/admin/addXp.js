const XP = require('../../models/xp')

module.exports = {
    name: 'xp',
    admin: true,
    run: async(bot, usr, msg, args) => {
        if (!args[0] || !args[1]) return;
        // Command: !xp Butter7838 1010 [remove]
        if (isNaN(Number(args[1]))) return;

        if (!args[2] || args[2] !== 'remove') {
            await XP.findOneAndUpdate({ username: args[0] },
                { $inc: { xp: Number(args[1]) } }, { upsert: true }    
            );
            
            bot.whisper(args[0], `Bạn đã được developer cộng thêm ${args[1]} XP`);
        } else if (args[2] === 'remove') {
            await XP.findOneAndUpdate({ username: args[0] },
                { $inc: { xp: Number(args[1]) * -1 } }, { upsert: true }    
            );
            
            bot.whisper(args[0], `Bạn đã bị developer trừ mất ${args[1]} XP`);

        }

    }
}