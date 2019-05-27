const chalk = require('chalk')

const { getFormsAndFields } = require('./utils/axios')
const { processForms } = require('./utils/processForms')

const log = console.log

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

// If we are in dev, ignore the fact that we are using a fake SSL certificate
if (activeEnv == 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

exports.sourceNodes = async (
    { actions: { createNode }, createContentDigest, createNodeId },
    { plugins, baseUrl, api, auth, ignoreFields = ['notifications'] }
) => {
    log(chalk.black.bgWhite('Starting Gravity Forms Source plugin'))

    // Get a full object of forms and fields
    let formsObj = await getFormsAndFields(auth, api, baseUrl)

    // Check to make sure we got forms. If issues occured
    // need to stop here
    if (formsObj) {
        log(chalk.black.bgWhite('Processing forms'))

        for (const [key, value] of Object.entries(formsObj)) {
            createNode(
                processForms(
                    createContentDigest,
                    createNodeId,
                    formsObj[key],
                    ignoreFields
                )
            )
        }

        log(chalk.black.bgWhite('Completed Gravity Forms Source plugin'))
    }
}
