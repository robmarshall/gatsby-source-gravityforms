const { getFormsAndFields } = require('./utils/axios')

const stringify = require('json-stringify-safe')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

// If we are in dev, ignore the fact that we are using a fake SSL certificate
if (activeEnv == 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

exports.sourceNodes = async (
    { actions: { createNode }, createContentDigest, createNodeId },
    { plugins, baseUrl, api, basicAuth }
) => {
    let thing = await getFormsAndFields(api, baseUrl)
    console.log(thing)
}
