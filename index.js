// require('dotenv').config();
const {
    Client,
    MessageEmbed
} = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml')
const mineflayer = require('mineflayer')
const tps = require('mineflayer-tps')(mineflayer);
const ms = require('ms');
const {
    join
} = require('path');
const mongoose = require('mongoose');
const XP = require('./models/xp');
const emojis = require('./emoji.json');

const client = new Client({
    intents: 32767
});

var data = yaml.load(
    fs.readFileSync(join(__dirname, 'config.yaml')),
)

var deathMsgs = yaml.load(
    fs.readFileSync(join(__dirname, 'death_msg.yaml')),
)

let config = {
    host: String(data.host),
    port: Number(data.port),
    username: String(data.username),
    pin: String(data.pin),
    mongodb: String(data.mongodb),
    prefix: String(data.prefix),
    token: String(data.discord.token),
    channel: String(data.discord.channelId),
	info: String(data.discord.infoId)
}

require('./database')(config.mongodb);

client.login(config.token)
    .then(() => console.log(`[Library-Info] Connected to Discord as ${client.user.tag}`))
    .catch(e => console.log(`[Error] Jeez, can't login 'cause of ${e}`));

/**
 * 
 * @param {Client} client 
 */
function run(client) {

    const bot = mineflayer.createBot({
        host: config.host,
        username: config.username,
        port: 25565,
        version: '1.16.5',
    });

    bot.loadPlugin(tps);

    bot.cmds = [];

    require('./handlers/cmd')(bot);

    bot.on('windowOpen', (window) => {
        window.requiresConfirmation = false;
        // Clicking function

        var p = config.pin.split(' ');

        for (let i = 0; i < 4; i++) {
            var digit = Number(p[i]);
            bot.clickWindow(digit, 0, 0);

        }
        setTimeout(() => {
            bot.chat('/anarchyvn')
        }, ms('10s'));
        setTimeout(() => {
            bot.clickWindow(13, 0, 0)
        }, ms('20s'));

    });


    bot.on('end', (r) => { // Reconnect when disconnected
        console.log(`[Pay attention!] Bot's been disconnected due to ${r}.`);
        console.log(`Attempting to reconnect in 15 seconds`);
        setTimeout(() => run, ms('15s'))
    })


    bot.on('chat', (usr, msg) => { // Chat command
        if (!msg.startsWith(config.prefix)) return
        const args = msg.slice(config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = bot.cmds.find(c => c.name === cmd);
        if (command) {
            if (command.admin && usr !== 'Butter7838') return;
            command.run(bot, usr, msg, args)
        }
    });

    bot.on('chat', async (usr, msg) => { // XP Handling
		if (usr.includes('Bot')) return
        let amount = Math.floor(Math.random() * 14) + 1;
        const user = await XP.findOne({
            username: usr
        });
        if (!user) {
            const newUser = new XP({
                username: usr,
                xp: amount,
                level: Math.floor(0.1 * Math.sqrt(amount))
            });
            await newUser.save()
                .then(async() => {
					let channel = await client.channels.cache.get(config.info);
					if (!channel) return
					const embed = new MessageEmbed()
						.setColor('GREEN')
						.setDescription(`[Info] Đã tạo dữ liệu cho \`${newUser.username}\``);
					channel.send({ embeds: [embed] })
				})
                .catch(e => console.log(`[Alert] Failed adding XP: ${e}`));
        } else {
            let chance = Math.random().toFixed(4);
            if (chance >= 0.9432) {
                addXP(bot, usr, amount);
            }
        }
    })


    // Discord events

    bot.on('messagestr', async (msg) => {
        // Output from game
        embedSend(msg, config.channel);
    });

    client.on('messageCreate', async (msg) => {
        // Transfer protocol - Input
        if (msg.channelId !== config.channel) return
		if (msg.author.bot) return
        msg.react('✅');
        let tag = msg.author.tag
        bot?.chat(`> [${tag.substring(0, tag.indexOf('#0'))}] ${msg} | ${Math.random()}`)
    })

}

var patterns = {
    discordLink: 'https://discord gg/' || 'https://discord/ gg/',
    donator: /<\[Donator\].+> (.+)/,
	donatorp: /<\[Donator\+\].+> (.+)/,
    unknown_cmd: /(Unknown command)/,
    whisper_from: /(.+) nhắn: (.+)/,
    whisper_to: /nhắn cho (.+): (.+)/,
    green: /<.+> > (.+)/,
    exploded: RegExp(deathMsgs.exploded),
    crystal: RegExp(deathMsgs.crystal),
    suicideCry: RegExp(deathMsgs.suicideCrystal),
    suicide1: RegExp(deathMsgs.suicide1),
    suicide2: RegExp(deathMsgs.suicide2),
    suicide3: RegExp(deathMsgs.suicide3),
    killedByPlayer: RegExp(deathMsgs.killedByPlayer),
    killedByPlayerUsing: RegExp(deathMsgs.killedByPlayerUsing),
    shotByPlayerUsing: RegExp(deathMsgs.shotByPlayerUsing),
    fall: RegExp(deathMsgs.fall),
    lava: RegExp(deathMsgs.lava),
    drowned: RegExp(deathMsgs.drowned),
    killedByMobUsing: RegExp(deathMsgs.killedByMobUsing),
    killedByMob: RegExp(deathMsgs.killedByMob),
    advancement: RegExp(deathMsgs.advancement_granted),
    goal: RegExp(deathMsgs.goal_granted),
    shotByMob: RegExp(deathMsgs.shotByMob)
}


/**
 * 
 * @param {String} msg 
 * @param {String} id
 */
async function embedSend(msg, id) {
    const {
        discordLink,
        donator,
		donatorp,
        unknown_cmd,
        whisper_from,
        whisper_to,
        green,
        exploded,
        crystal,
        suicide1,
        suicide2,
        suicide3,
        suicideCry,
        killedByPlayer,
        killedByPlayerUsing,
        shotByPlayerUsing,
        fall,
        lava,
        drowned,
        killedByMob,
        killedByMobUsing,
        shotByMob
    } = patterns
    let raw = new MessageEmbed()
		.setTitle('[Mind-reading]')
        .setDescription(msg)
        .setFooter({
            iconURL: client.user.avatarURL({
                dynamic: true
            }),
            text: `Project: Crystal-XP Bot | ${client.user.tag}`
        })
    if (msg.match(donator)) {
        raw.setColor('#fff829')
        .setDescription(`${emojis.moneyRain} ${msg}`)
    } else if (msg.match(donatorp)) {
		raw.setColor('#d61114')
        .setDescription(`${emojis.moneyRain} ${msg}`)
	} else if (msg.match(unknown_cmd)) {
        raw.setColor('#a6a597')
    } else if (msg.match(whisper_from) || msg.match(whisper_to)) {
        raw.setColor('#ff40f9')
    } else if (msg.match(green)) {
        raw.setColor('#3cff2e')
    } else if (msg.match(exploded)) {
        raw.setColor('#ff1c1c') // Red
        .setDescription(`${emojis.creeper} **${msg}**`);
    } else if (msg.match(crystal) || msg.match(suicideCry)) {
        raw.setColor('#ff1c1c')
        .setDescription(`${emojis.stab} ${emojis.crystal} **${msg}**`)
    } else if (msg.match(suicide1) || msg.match(suicide2) || msg.match(suicide3)
    || msg.match(fall) || msg.match(lava) || msg.match(drowned))
    {
        raw.setColor('#ff1c1c')
        .setDescription(`${emojis.suicide} **${msg}**`)
    } else if (msg.match(killedByPlayer) || msg.match(killedByPlayerUsing)
    || msg.match(killedByMob) || msg.match(killedByMobUsing)) {
        raw.setColor('#ff1c1c')
        .setDescription(`${emojis.stab} **${msg}**`)
    } else if (msg.match(shotByPlayerUsing) || msg.match(shotByMob)) {
        raw.setColor('#ff1c1c')
        .setDescription(`${emojis.gun} **${msg}**`)
    } else if (msg.includes(discordLink) || msg.includes('discord gg')) {
        raw.setDescription(msg.replace('discord gg', 'discord.gg'))
    }
    else {
		raw.setColor('#38c1f2')
	}

    const channel = await client.channels.cache.get(id);
    if (!channel) return
    channel.send({
        embeds: [raw]
    })
}

const xpNeeded = level => level * (2 * level) + 90;

/**
 * 
 * @param {mineflayer.Bot} bot
 * @param {String} usr 
 * @param {Number} xp2Add 
 */
const addXP = async(bot, usr, xp2Add) => {
    try {
        const result = await XP.findOneAndUpdate(
            { username: usr },
            {
                $inc: { xp: xp2Add }
            },
            {
                upsert: true,
                new: true
            }
        )


        let { xp, level } = result;
        
        if (xp >= xpNeeded(level)) {
            ++level;
            xp -= xpNeeded(level);

            bot.whisper(usr,
                `Chúc mừng bạn đã lên Lv.${level}!!`    
            )

            await XP.updateOne({ username: usr }, { level: level, xp: xp })
        }

        embedSend(
            `Đã cộng thêm \`${xp2Add} XP\` cho \`${usr}\``,
            config.info
        )

    } catch(err) {
        embedSend(`Oops, can't add XP, error: ${err}`, config.info)
    }

}

run(client)