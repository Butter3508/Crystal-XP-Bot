const { Client } = require('discord.js')
const yaml = require('js-yaml')
const fs = require('fs')
const mineflayer = require('mineflayer')
const tps = require('mineflayer-tps')(mineflayer)

var data = yaml.load(
    fs.readFileSync('./config.yaml')
)
let config = {
    host: String(data.host),
    port: Number(data.port),
    username: String(data.username),
    pin: String(data.pin),
    prefix: String(data.prefix),
    channel: String(data.channelId)
}

/**
 * 
 * @param {Client} client 
 */
async function run (client) {

    const bot = mineflayer.createBot({
        host: config.host,
        username: config.username,
        port: 25565,
        version: '1.16.5',
    });
    
    bot.client = client;

    bot.loadPlugin(tps);

    bot.pin = String(config.pin);
    bot.cmds = [];
    bot.channelId = '';
    bot.prefix = config.prefix;

    require('./handlers/event')(bot);
    require('./handlers/cmd')(client, bot);
} 

module.exports = run;