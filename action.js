const Aqua = require('./common/net/Aqua')

module.exports = class {
    constructor({argv}) {
        this.Aqua = new Aqua({
            baseUrl: argv.baseUrl,
            token: argv.token,
        })
    }

    async execute () {
        await this.Aqua.logout()
    }
}