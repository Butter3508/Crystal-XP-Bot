// require('dotenv').config();
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml')
const client = new Client({
    intents: 32767
});

client.commands = new Collection();
client.aliases = new Collection();
require('./handlers/event-djs')(client)

var data = yaml.load(
    fs.readFileSync('./config.yaml')
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
    .then(() => console.log(`[INFO] Đã truy cập Discord với user ${client.user.tag}`))
    .catch(e => {});