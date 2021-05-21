const core = require('@actions/core');
const github = require('@actions/github');

const Action = require('./action')

async function exec () {
  try {
    if (!(process.env.AQUA_BASE_URL || core.getInput('aqua-base-url'))) throw new Error('Please specify aqua-base-url as input or AQUA_BASE_URL as env')
    if (!(process.env.AQUA_TOKEN || core.getInput('aqua-token'))) throw new Error('Please specify aqua-token as input or AQUA_TOKEN as env')

    const argv = {
        baseUrl: process.env.AQUA_BASE_URL || core.getInput('aqua-base-url'),
        token: process.env.AQUA_TOKEN || core.getInput('aqua-token')
    }

    await new Action({argv}).execute()

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

exec()
