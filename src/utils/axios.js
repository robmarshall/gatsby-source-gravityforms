const axios = require('axios')
const oauthSignature = require('oauth-signature')

const { routes } = require('./routes')
const { isObjEmpty } = require('./helpers')
const { new0AuthParameters } = require('./0AuthParameters')

// Get list of all forms from GF
async function getForms(api, baseUrl) {
    const authParams = new0AuthParameters(api.key)

    const signature = oauthSignature.generate(
        'GET',
        baseUrl + routes.wp + routes.gf + routes.forms,
        authParams,
        api.secret
    )

    let result = await axios.get(
        baseUrl + routes.wp + routes.gf + routes.forms,
        {
            responseType: 'json',
            params: {
                ...authParams,
                oauth_signature: signature,
            },
        }
    )

    // TODO - catch errors, return error or data

    return result.data
}

// Get form fields from GF
async function getFormFields(api, baseUrl, form) {
    let authParams = new0AuthParameters(api.key)

    // Make a new signature
    const signature = oauthSignature.generate(
        'GET',
        baseUrl + routes.wp + routes.gf + routes.forms + '/' + form.id,
        authParams,
        api.secret
    )

    let result = await axios.get(
        baseUrl + routes.wp + routes.gf + routes.forms + '/' + form.id,
        {
            responseType: 'json',
            params: {
                ...authParams,
                oauth_signature: signature,
            },
        }
    )

    // TODO - catch errors, return error or data

    return result.data
}

async function getFormsAndFields(api, baseUrl) {
    let formObj = {}

    // First get forms in list
    let allForms = await getForms(api, baseUrl)

    if (!isObjEmpty(allForms)) {
        for (const [key, value] of Object.entries(allForms)) {
            // Clone form object
            let currentForm = { ...allForms[key] }

            // remove unneeded key
            delete currentForm.entries

            let form = await getFormFields(api, baseUrl, currentForm)

            formObj['form-' + currentForm.id] = form
        }
    }

    return formObj
}

module.exports = {
    getFormsAndFields,
}
