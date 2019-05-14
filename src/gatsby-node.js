const axios = require('axios')
const oauthSignature = require('oauth-signature')
const nanoid = require('nanoid')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

// If we are in dev, ignore the fact that we are using a fake SSL certificate
if (activeEnv == 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

exports.sourceNodes = async (
    { actions: { createNode }, createNodeId },
    { plugins, baseUrl, api, basicAuth }
) => {
    // Set all routes before we start
    const routes = {
        wp: '/wp-json',
        gf: '/gf/v2',
        allForms: '/forms',
    }

    // Make unix timestamp
    const timestamp = Math.round(new Date().getTime() / 1000)

    // These parameters are for all GF calls
    const consumerSecret = api.secret
    const parameters = {
        oauth_consumer_key: api.key,
        oauth_timestamp: timestamp,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        oauth_nonce: nanoid(11),
    }

    // Lets get all form details
    const encodedSignature = oauthSignature.generate(
        'GET',
        baseUrl + routes.wp + routes.gf + routes.allForms,
        parameters,
        consumerSecret
    )

    axios
        .get(baseUrl + routes.wp + routes.gf + routes.allForms, {
            params: {
                ...parameters,
                oauth_signature: encodedSignature,
            },
        })
        .then(function(response) {
            // First count the response. If more than 0 lets get details!
            console.log(response.data)
        })
        .catch(function(error) {
            console.log(error)
        })
}
