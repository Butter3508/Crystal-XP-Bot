const ms = require('ms')

module.exports = {
    name: 'ready',
    async run(client) {
        client.user.setActivity({
            name: '@tung4402',
            type: 'LISTENING',
        })
        console.log(`[INFO] Sẽ khởi động bot sau 5 giây`)

        setTimeout(() => { require('../../bot')(client) }, ms('5s'))
    }
}