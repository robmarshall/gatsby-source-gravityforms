const { getFormsAndFields } = require('./utils/axios')
const { processForms } = require('./utils/processForms')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

exports.sourceNodes = async (
    { actions: { createNode }, createContentDigest, createNodeId, reporter },
    {
        baseUrl,
        api,
        include,
        exclude,
        allowSelfSigned = false,
        basicAuth = {
            username: '',
            password: '',
        },
        ignoreFields = ['notifications'],
    }
) => {
    global.reporter = reporter

    // If we are in dev, ignore the fact that we are using a fake SSL certificate.
    if (activeEnv == 'development' && allowSelfSigned) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    }

    reporter.verbose('Starting Gravity Forms Source plugin')

    // Run initial checks.
    if (!baseUrl) {
        reporter.panic(
            'We could not find a baseUrl in your gatsby-config.js',
            new Error('Missing baseURL in config')
        )
        return
    }
    reporter.verbose(`Using: ${baseUrl}`)

    if (!api.key || !api.secret) {
        reporter.panic(
            'You seem to be missing Gravity Forms API details in your gatsby-config.js',
            new Error('Misisng api keys in config')
        )
        return
    }

    let formsArgs = {}

    if (Array.isArray(include) && include.length) {
        formsArgs.include = include
    }

    if (Array.isArray(exclude) && exclude.length) {
        formsArgs.exclude = exclude
    }

    // Get a full object of forms and fields.
    let formsObj = await getFormsAndFields(basicAuth, api, baseUrl, formsArgs)

    // Check to make sure we got forms. If issues occured
    // need to stop here.
    if (formsObj) {
        const entriesArr = Object.entries(formsObj)
        reporter.info(`Processing ${entriesArr.length} Gravity Forms`)

        for (const [key, value] of entriesArr) {
            createNode(
                processForms(
                    createContentDigest,
                    createNodeId,
                    formsObj[key],
                    ignoreFields
                )
            )
        }

        reporter.verbose('Completed Gravity Forms Source plugin')
    }
}
