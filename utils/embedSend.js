const fs= require('fs'); 
const yaml = require('js-yaml');

var deathMsgs = yaml.load(fs.readFileSync('./death_msg.yaml'))
const { MessageEmbed } = require('discord.js')
const livechat = require('../models/live');

const emojis = require('../emoji.json')
var patterns = {
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
    shotByMob: RegExp(deathMsgs.shotByMob),
    donate: RegExp(deathMsgs.donate)
}


/**
 * 
 * @param {String} msg 
 * @param {String} id
 */
async function embedSend(client, msg, color) {
    let str = msg.replace(/https:\/\/discord gg\//g, 'https://discord.gg/');

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
        shotByMob,
        donate
    } = patterns
    let raw = new MessageEmbed()
		.setTitle('[Mind-reading]')
        .setDescription(msg.replace(/https:\/\/discord gg\//g, 'https://discord.gg/'))
        .setFooter({
            iconURL: client.user.avatarURL({
                dynamic: true
            }),
            text: `Project: Crystal-XP Bot | ${client.user.tag}`
        })
    
    if (!color) {
        if (msg.match(donator)) {
            raw.setColor('#fff829')
            .setDescription(`${emojis.moneyRain} ${str}`)
        } else if (msg.match(donatorp)) {
            raw.setColor('#d61114')
            .setDescription(`${emojis.moneyRain} ${emojis.moneyRain} ${str}`)
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
        || msg.match(lava) || msg.match(drowned))
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
        } else if (msg.match(fall)) {
            raw
            .setColor('#ff1c1c')
            .setDescription(`${emojis.suicide} ${emojis.fall} **${msg}**`)
        } else if (msg.match(donate)) {
            raw
            .setColor('#fff829')
            .setDescription(`${emojis.moneyRain} **${msg}** ${emojis.moneyRain}`)
        }
        else {
            raw.setColor('#38c1f2')
        }
    } else { raw.setColor(color) }

        livechat.find().then(async(datas) => datas.forEach(async data => {
            let guild = client.guilds.cache.get(data.guildId);
            if (!guild) return
            let channel = guild.channels.cache.get(data.channelId)
            if (!channel || !channel.isText()) return
            channel.send({ embeds: [raw] }).catch(e => {})
        }))
}

module.exports = embedSend;