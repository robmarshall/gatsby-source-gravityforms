const axios = require('axios')
const oauthSignature = require('oauth-signature')

const isObjEmpty = require('./utils/isObjEmpty.js')
const new0AuthParameters = require('./utils/0AuthParameters.js')

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

    // These parameters are for all GF calls
    const consumerSecret = api.secret

    const allFormsParams = new0AuthParameters(api.key)

    // Lets get all form details
    const encodedSignature = oauthSignature.generate(
        'GET',
        baseUrl + routes.wp + routes.gf + routes.allForms,
        allFormsParams,
        consumerSecret
    )

    // Make the call, get all form details
    axios
        .get(baseUrl + routes.wp + routes.gf + routes.allForms, {
            params: {
                ...allFormsParams,
                oauth_signature: encodedSignature,
            },
        })
        .then(function(response) {
            const allForms = response.data

            // If there are forms to show, lets go!
            if (!isObjEmpty(allForms)) {
                Object.keys(allForms).forEach(function(key) {
                    // Lets get the details for each form
                    let currentFormID = allForms[key].id
                    console.log(currentFormID)
                })
            } else {
                console.log('No forms seem to be made yet?')
            }
        })
        .catch(function(error) {
            console.log(error)
        })
}
