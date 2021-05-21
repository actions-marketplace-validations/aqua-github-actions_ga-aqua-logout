const { format } = require('url')

const serviceName = 'aqua'
const client = require('./client')(serviceName)

class Aqua {
    constructor({baseUrl, token}) {
        this.baseUrl = baseUrl
        this.token = token
    }

    async logout() {
        return this.fetch('Session',
            {
                pathname: '/Session',
            },
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                }
            }
        )
    }

    async fetch (apiMethodName, { host, pathname, query },  { method, headers = {} } = {}) {
        const url = format({
          host: host || this.baseUrl,
          pathname,
          query,
        })

        const state = {
          req: {
            method,
            headers,
            url,
          },
        }

        try {
            await client(state, `${serviceName}:${apiMethodName}`)
        } catch (error) {
            const fields = {
                originError: error,
                source: 'aqua',
            }

            delete state.req.headers

            throw Object.assign(new Error('Aqua API error'), state, fields )
        }
        return state.res.body
    }


}


module.exports = Aqua